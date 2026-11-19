'use strict';
const fs=require('fs'),path=require('path');
const{now,rid,sha,readJson,esc}=require('./util'),A=require('./auth'),pub=require('./publish'),api=require('./api'),{handleContact}=require('../api/_lib/contact-handler');
const ROOT=path.join(__dirname,'..');
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.pdf':'application/pdf','.svg':'image/svg+xml'};
const ADMIN_CSP="default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'";
const PREVIEW_CSP="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.youtube-nocookie.com; frame-ancestors 'self'; base-uri 'self'";
const BASE={'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin'};
function createApp(db,env){const routes=api.make({db,env});
 const send=(res,s,o,h={})=>{res.writeHead(s,Object.assign({'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'},BASE,h));res.end(JSON.stringify(o))};
 const ip=req=>String(req.headers['x-forwarded-for']||'').split(',')[0].trim()||req.socket.remoteAddress||'';
 const originOk=req=>{const o=req.headers.origin;if(!o)return true;try{return new URL(o).host===req.headers.host}catch(e){return false}};
 const baseUrl=req=>env.PUBLIC_URL||((req.headers['x-forwarded-proto']||'http')+'://'+req.headers.host);
 async function sendMail(to,subject,text){const{RESEND_API_KEY:k,CONTACT_FROM_EMAIL:f}=env;if(!k||!f)return false;try{const r=await fetch(env.RESEND_API_URL||'https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+k,'Content-Type':'application/json'},body:JSON.stringify({from:f,to:[to],subject,text})});return r.ok}catch(e){return false}}
 async function authRoutes(req,res,url,p,au){const m=req.method;
  if(p==='/api/auth/me'){if(!au)return send(res,401,{ok:false,error:'unauthenticated'});return send(res,200,{ok:true,user:{email:au.user.email,name:au.user.name,role:au.user.role},csrf:au.session.csrf,mustChange:!!au.user.must_change})}
  if(m!=='POST')return send(res,405,{ok:false,error:'method_not_allowed'});
  if(!originOk(req))return send(res,403,{ok:false,error:'forbidden'});
  const b=await readJson(req,20000);
  if(p==='/api/auth/login'){const r=A.login(db,b.email||'',b.password||'',ip(req));if(r.error)return send(res,r.status,{ok:false,error:r.error});const s=db.prepare('SELECT csrf FROM sessions WHERE id=?').get(sha(r.token));return send(res,200,{ok:true,csrf:s.csrf,mustChange:!!r.user.must_change},{'Set-Cookie':A.cookie(r.token,req)})}
  if(p==='/api/auth/forgot'){const k='f:'+ip(req);if(A.throttled(k,5,3600e3))return send(res,429,{ok:false,error:'Too many requests. Try again later.'});A.noteFail(k);const u=db.prepare('SELECT * FROM users WHERE email=?').get(String(b.email||'').trim().toLowerCase());
   if(u){const tok=rid(32);db.prepare('INSERT INTO resets(token_hash,user_id,expires_at) VALUES(?,?,?)').run(sha(tok),u.id,new Date(Date.now()+3600e3).toISOString());const link=baseUrl(req)+'/admin/reset.html?token='+tok;
    const sent=await sendMail(u.email,'Reset your admin password','Use this link within one hour to choose a new password:\n\n'+link+'\n\nIf you did not request this, ignore this email.');
    if(!sent){console.log('[admin] Password reset link (email is not configured, so it is shown here only): '+link)}}
   return send(res,200,{ok:true,message:'If that email belongs to an admin account, a reset link has been sent. If email delivery is not configured on the server, the link is written to the server log.'})}
  if(p==='/api/auth/reset'){const r=db.prepare('SELECT * FROM resets WHERE token_hash=? AND used=0').get(sha(String(b.token||'')));if(!r||Date.parse(r.expires_at)<Date.now())return send(res,400,{ok:false,error:'This reset link is invalid or has expired.'});
   if(!A.strongEnough(b.password))return send(res,400,{ok:false,error:'Use at least 12 characters, including a letter and a number or symbol.'});
   db.prepare('UPDATE users SET pass_hash=?,must_change=0 WHERE id=?').run(A.hashPw(b.password),r.user_id);db.prepare('UPDATE resets SET used=1 WHERE user_id=?').run(r.user_id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(r.user_id);return send(res,200,{ok:true})}
  if(!au)return send(res,401,{ok:false,error:'unauthenticated'});
  if(req.headers['x-csrf-token']!==au.session.csrf)return send(res,403,{ok:false,error:'Invalid CSRF token'});
  if(p==='/api/auth/logout'){db.prepare('DELETE FROM sessions WHERE id=?').run(au.session.id);return send(res,200,{ok:true},{'Set-Cookie':A.cookie('',req,true)})}
  if(p==='/api/auth/logout-all'){db.prepare('DELETE FROM sessions WHERE user_id=? AND id<>?').run(au.user.id,au.session.id);return send(res,200,{ok:true})}
  const u=db.prepare('SELECT * FROM users WHERE id=?').get(au.user.id);
  if(p==='/api/auth/change-password'){if(!A.verifyPw(String(b.current||''),u.pass_hash))return send(res,400,{ok:false,error:'Your current password is not correct.'});if(!A.strongEnough(b.password))return send(res,400,{ok:false,error:'Use at least 12 characters, including a letter and a number or symbol.'});if(b.password===b.current)return send(res,400,{ok:false,error:'Choose a different password.'});
   db.prepare('UPDATE users SET pass_hash=?,must_change=0 WHERE id=?').run(A.hashPw(b.password),u.id);db.prepare('DELETE FROM sessions WHERE user_id=? AND id<>?').run(u.id,au.session.id);return send(res,200,{ok:true})}
  if(p==='/api/auth/change-email'){const e=String(b.email||'').trim().toLowerCase();if(!A.verifyPw(String(b.password||''),u.pass_hash))return send(res,400,{ok:false,error:'Your password is not correct.'});if(!A.EMAIL.test(e))return send(res,400,{ok:false,error:'Enter a valid email address.'});
   if(db.prepare('SELECT id FROM users WHERE email=? AND id<>?').get(e,u.id))return send(res,400,{ok:false,error:'That email is already in use.'});db.prepare('UPDATE users SET email=? WHERE id=?').run(e,u.id);return send(res,200,{ok:true,email:e})}
  return send(res,404,{ok:false,error:'Not found'})}
 async function handle(req,res){const url=new URL(req.url,'http://x'),p=decodeURIComponent(url.pathname),m=req.method;
  try{
   if(p==='/api/contact'){const b=m==='POST'?await readJson(req,20000).catch(()=>null):null;const r=await handleContact({method:m,headers:req.headers,body:b,ip:ip(req),env,store:(d,at)=>db.prepare('INSERT INTO inquiries(name,email,company,subject,budget,message,created_at) VALUES(?,?,?,?,?,?,?)').run(d.name,d.email,d.company,d.subject,d.budget,d.message,at)});return send(res,r.status,r.json)}
   if(p.startsWith('/uploads/')){const f=p.slice(9);if(!/^[A-Za-z0-9]{6,32}\.(png|jpg|webp|gif|pdf)$/.test(f)||!fs.existsSync(path.join(ROOT,'uploads',f))){res.writeHead(404);return res.end('Not found')}res.writeHead(200,Object.assign({'Content-Type':MIME[path.extname(f)],'Cache-Control':'public, max-age=3600'},BASE));return fs.createReadStream(path.join(ROOT,'uploads',f)).pipe(res)}
   const adminAsset=p==='/admin'||p.startsWith('/admin/');const authFree=new Set(['/admin/login.html','/admin/reset.html','/admin/login.js','/admin/admin.css']);
   if(p.startsWith('/api/')&&p.startsWith('/api/auth/'))return authRoutes(req,res,url,p,A.authenticate(db,req));
   if(p.startsWith('/api/')||p.startsWith('/preview/')||(adminAsset&&!authFree.has(p))){const au=A.authenticate(db,req);
    if(!au||au.user.role!=='admin'){if(p.startsWith('/api/'))return send(res,401,{ok:false,error:'unauthenticated'});res.writeHead(302,{Location:'/admin/login.html'});return res.end()}
    if(au.user.must_change&&p.startsWith('/api/'))return send(res,403,{ok:false,error:'password_change_required',mustChange:true});
    if(p.startsWith('/preview/')){const parts=p.split('/').filter(Boolean);let h=null;if(parts[1]==='page')h=pub.preview(db,parts[2]);else if(parts[1]==='article')h=pub.preview(db,'article',parts[2]);else if(parts[1]==='project')h=pub.preview(db,'project',parts[2]);else if(parts[1]==='strategy')h=pub.preview(db,'strategy',parts[2]);if(h==null){res.writeHead(404);return res.end('Not found')}
     res.writeHead(200,Object.assign({'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':PREVIEW_CSP,'Cache-Control':'no-store'},BASE));return res.end(h)}
    if(adminAsset){const f=p==='/admin'||p==='/admin/'?'index.html':p.slice(7);if(!/^[\w.-]+$/.test(f)||!fs.existsSync(path.join(ROOT,'admin',f))){res.writeHead(404);return res.end('Not found')}res.writeHead(200,Object.assign({'Content-Type':MIME[path.extname(f)]||'application/octet-stream','Content-Security-Policy':ADMIN_CSP,'Cache-Control':'no-store'},BASE));return fs.createReadStream(path.join(ROOT,'admin',f)).pipe(res)}
    if(m!=='GET'&&m!=='HEAD'){if(!originOk(req))return send(res,403,{ok:false,error:'forbidden'});if(req.headers['x-csrf-token']!==au.session.csrf)return send(res,403,{ok:false,error:'Invalid CSRF token'})}
    for(const r of routes){if(r.m!==m)continue;const g=r.re.exec(p);if(!g)continue;const rq={req,url};const body=r.o.raw||m==='GET'||m==='DELETE'?{}:await readJson(req,3e6);const out=await r.fn(rq,...g.slice(1),body,au.user);
     if(out.raw!==undefined){res.writeHead(200,Object.assign({'Content-Type':out.type,'Content-Disposition':'attachment; filename="'+out.name+'"','Cache-Control':'no-store'},BASE));return res.end(out.raw)}
     return send(res,out.s,out.o)}
    return send(res,404,{ok:false,error:'Not found'})}
   if(adminAsset){const f=p==='/admin'||p==='/admin/'?null:p.slice(7);if(!f){res.writeHead(302,{Location:'/admin/login.html'});return res.end()}res.writeHead(200,Object.assign({'Content-Type':MIME[path.extname(f)]||'text/plain','Content-Security-Policy':ADMIN_CSP,'Cache-Control':'no-store'},BASE));return fs.createReadStream(path.join(ROOT,'admin',f)).pipe(res)}
   return false}
  catch(e){const s=e.status||500;if(s>=500)console.error('request failed:',p,e.message);if(res.headersSent)return res.end();return send(res,s,{ok:false,error:s===413?'The upload is too large.':s===400?'Invalid request':'Something went wrong. Please try again.'})}}
 function runScheduled(){const due=db.prepare("SELECT id FROM docs WHERE collection='articles' AND status='scheduled' AND publish_at<=?").all(now());for(const d of due){const r=routes.doPublish('articles',d.id,{email:'scheduler'});if(r.s!==200){db.prepare("UPDATE docs SET status='draft',publish_at=NULL WHERE id=?").run(d.id);routes.log({email:'scheduler'},'scheduled publish failed',String(d.id))}}return due.length}
 return{handle,runScheduled}}
module.exports={createApp};
