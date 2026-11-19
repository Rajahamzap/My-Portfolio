'use strict';
/* Framework-agnostic contact form handler. Used by api/contact.js (Vercel-style serverless) and server.js (plain Node).
   Nothing is stored. The submission is validated, then forwarded to the email provider (Resend). */
const SUBJECTS=['SEO Project Inquiry','Technical SEO Consultation','GEO / AEO Consultation','Freelance Opportunity','Full-Time Job Opportunity','Agency Collaboration','General Inquiry','Other'];
const BUDGETS=['Under $500','$500–$1,000','$1,000–$2,500','$2,500–$5,000','$5,000+','Not Decided Yet','Not Applicable']; /* keep in sync with SITE.contact in js/content.js (test/contact-handler.test.js checks this) */
const LIMITS={max:5,windowMs:10*60*1000,minFillMs:2500};
const buckets=new Map(); /* in-memory: resets on restart and is per-instance on serverless. Use a shared store (Upstash/Redis/KV) for strict production limits. */
function limited(ip,now){const k=ip||'unknown';let b=(buckets.get(k)||[]).filter(t=>now-t<LIMITS.windowMs);b.push(now);buckets.set(k,b);if(buckets.size>5000)for(const [x,v] of buckets)if(!v.some(t=>now-t<LIMITS.windowMs))buckets.delete(x);return b.length>LIMITS.max}
const oneLine=(s,max)=>String(s==null?'':s).replace(/[\u0000-\u001f\u007f\u2028\u2029]/g,' ').replace(/\s+/g,' ').trim();
const multi=s=>String(s==null?'':s).replace(/\r\n?/g,'\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'').trim();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function validate(b){const e={},d={};
 d.name=oneLine(b.name);if(d.name.length<2||d.name.length>100)e.name='Please enter your full name (2 to 100 characters).';
 d.email=oneLine(b.email);if(!/^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]{2,}$/.test(d.email)||d.email.length>254)e.email='Please enter a valid email address.';
 d.company=oneLine(b.company);if(d.company.length>200)e.company='Company or website must be 200 characters or fewer.';
 d.subject=oneLine(b.subject);if(!SUBJECTS.includes(d.subject))e.subject='Please choose a subject.';
 d.budget=oneLine(b.budget);if(d.budget&&!BUDGETS.includes(d.budget))e.budget='Please choose a valid budget range.';
 d.message=multi(b.message);if(d.message.length<10||d.message.length>5000)e.message='Please enter a message (10 to 5000 characters).';
 if(b.consent!==true)e.consent='Please agree so I can use your details to reply.';
 return{e,d}}
function compose(d,when){const rows=[['Name',d.name],['Email',d.email],['Company / Website',d.company||'Not provided'],['Subject',d.subject],['Budget range',d.budget||'Not provided'],['Submitted (UTC)',when]];
 const text=rows.map(r=>r[0]+': '+r[1]).join('\n')+'\n\nMessage:\n'+d.message;
 const html='<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">'+rows.map(r=>'<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td></tr>').join('')+'</table><p style="font-family:Arial,sans-serif;font-size:14px"><b>Message</b></p><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">'+esc(d.message)+'</p>';
 return{text,html}}
async function handleContact({method,headers={},body,ip,env={},fetchImpl,store,now=Date.now()}){
 const J=(status,json)=>({status,json});
 if(method!=='POST')return J(405,{ok:false,error:'method_not_allowed'});
 const origin=headers.origin;if(env.ALLOWED_ORIGIN&&origin&&origin!==env.ALLOWED_ORIGIN)return J(403,{ok:false,error:'forbidden'});
 if(limited(ip,now))return J(429,{ok:false,error:'rate_limited'});
 if(!body||typeof body!=='object'||Array.isArray(body))return J(400,{ok:false,error:'invalid_request'});
 if(String(body.hp||'').trim()!=='')return J(200,{ok:true}); /* honeypot: bots get a quiet success and nothing is sent */
 const ts=Number(body.ts);if(Number.isFinite(ts)&&ts>0&&now-ts<LIMITS.minFillMs)return J(200,{ok:true}); /* submitted impossibly fast */
 const{e,d}=validate(body);if(Object.keys(e).length)return J(400,{ok:false,error:'validation',errors:e});
 const when=new Date(now).toISOString().replace('T',' ').slice(0,19)+' UTC';
 let stored=false;if(typeof store==='function'){try{store(d,new Date(now).toISOString());stored=true}catch(err){console.error('contact: could not store inquiry')}}
 const key=env.RESEND_API_KEY,to=env.CONTACT_TO_EMAIL,from=env.CONTACT_FROM_EMAIL;
 if(!key||!to||!from)return stored?J(200,{ok:true,stored:true,emailed:false}):J(503,{ok:false,error:'not_configured'});
 const url=env.RESEND_API_URL||'https://api.resend.com/emails',f=fetchImpl||fetch;
 const m=compose(d,when);
 try{const r=await f(url,{method:'POST',headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:d.email,subject:('New inquiry: '+d.subject+' from '+d.name).slice(0,200),text:m.text,html:m.html})});
  if(!r.ok){console.error('contact: email provider returned',r.status);return stored?J(200,{ok:true,stored:true,emailed:false}):J(502,{ok:false,error:'send_failed'})}}
 catch(err){console.error('contact: email provider unreachable');return stored?J(200,{ok:true,stored:true,emailed:false}):J(502,{ok:false,error:'send_failed'})}
 if(env.SEND_ACK==='true'){try{await f(url,{method:'POST',headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:[d.email],subject:'Thanks for getting in touch',text:'Hi '+d.name+',\n\nThanks for your message. It has been received and I will review it.\n\nRaja Hamza Pervaiz'})})}catch(x){}}
 return J(200,{ok:true,stored,emailed:true})}
module.exports={handleContact,validate,SUBJECTS,BUDGETS,LIMITS,_buckets:buckets};
