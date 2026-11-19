(function(){
var S=window.SITE,C=S.contact,I=window.ICONS,$=function(s){return document.querySelector(s)},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var ic=function(n){return'<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24">'+I[n]+'</svg></span>'};
function put(id,h){var e=document.getElementById(id);if(e)e.innerHTML=h}
var li=C.linkedin.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'');
put('info-h',C.introHeading);put('info-p',C.intro);
put('info',[['mail','Email','<a class="v" href="mailto:'+C.email+'">'+C.email+'</a>',C.emailLabel],['linkedin','LinkedIn','<a class="v" href="'+C.linkedin+'" target="_blank" rel="noopener">'+li+'</a>',C.linkedinLabel],['pin','Location','<span class="v">'+C.location+'</span>',C.locationLabel],['spark','Professional Availability','<span class="v" style="font-weight:500;font-size:1rem;font-family:var(--fb)">'+C.availability+'</span>','']].map(function(r,i){return'<div class="ci rv">'+ic(r[0])+'<div><h3>'+r[1]+'</h3>'+r[2]+(r[3]?'<p>'+r[3]+'</p>':'')+'</div></div>'}).join(''));
put('f-subject','<option value="">Select a subject</option>'+C.subjects.map(function(s){return'<option>'+s+'</option>'}).join(''));
put('f-budget','<option value="">Select budget (optional)</option>'+C.budgets.map(function(s){return'<option>'+s+'</option>'}).join(''));
put('sv-h',C.servicesHeading);put('sv',C.services.map(function(s){return'<article class="sv rv">'+ic(s.icon)+'<h3>'+s.t+'</h3><p>'+s.d+'</p></article>'}).join(''));
put('st-h',C.stepsHeading);put('st',C.steps.map(function(s,i){return'<div class="stp rv"><b aria-hidden="true">'+(i+1)+'</b><h3>'+s.t+'</h3><p>'+s.d+'</p></div>'}).join(''));
put('faq',C.faq.map(function(f,i){return'<div class="fq rv"><h3><button type="button" id="fb'+i+'" aria-expanded="false" aria-controls="fp'+i+'"><span>'+f.q+'</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></h3><div class="fa" id="fp'+i+'" role="region" aria-labelledby="fb'+i+'"><div><p>'+f.a+'</p></div></div></div>'}).join(''));
put('cta-h',C.cta.heading);put('cta-p',C.cta.text);$('#cta-b').textContent=C.cta.button;
document.getElementById('faq').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var q=b.closest('.fq'),o=q.classList.toggle('open');b.setAttribute('aria-expanded',o)});
/* form */
var f=$('#cf'),st=$('#fs'),btn=$('#fsub'),busy=false,t0=Date.now();
var F={name:$('#f-name'),email:$('#f-email'),company:$('#f-company'),subject:$('#f-subject'),budget:$('#f-budget'),message:$('#f-message'),consent:$('#f-consent')};
function err(k,m){var el=$('#e-'+k),i=F[k];el.textContent=m||'';if(m)i.setAttribute('aria-invalid','true');else i.removeAttribute('aria-invalid')}
function check(){var e={},v=function(k){return F[k].value.trim()};
 if(v('name').length<2)e.name='Please enter your full name.';else if(v('name').length>100)e.name='Name must be 100 characters or fewer.';
 if(!/^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]{2,}$/.test(v('email')))e.email='Please enter a valid email address.';
 if(v('company').length>200)e.company='Company or website must be 200 characters or fewer.';
 if(!v('subject'))e.subject='Please choose a subject.';
 if(v('message').length<10)e.message='Please enter a message of at least 10 characters.';else if(v('message').length>5000)e.message='Message must be 5000 characters or fewer.';
 if(!F.consent.checked)e.consent='Please agree so I can use your details to reply.';
 Object.keys(F).forEach(function(k){err(k,e[k])});return e}
function say(cls,html){st.className='fstat show '+cls;st.innerHTML=html}
var mail='<a href="mailto:'+C.email+'">'+C.email+'</a>';
f.addEventListener('submit',function(ev){ev.preventDefault();if(busy)return;st.className='fstat';var e=check(),k=Object.keys(e);if(k.length){F[k[0]].focus();say('err','Please fix the highlighted fields and try again.');return}
 busy=true;btn.disabled=true;btn.setAttribute('aria-busy','true');var lab=btn.textContent;btn.textContent='Sending...';
 var p={name:F.name.value,email:F.email.value,company:F.company.value,subject:F.subject.value,budget:F.budget.value,message:F.message.value,consent:true,hp:f.elements.hp.value,ts:t0};
 fetch(C.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{s:r.status,j:j}})}).then(function(x){
  if(x.s===200&&x.j.ok===true){say('ok','Thank you. Your message has been received.');f.reset();t0=Date.now();Object.keys(F).forEach(function(k){err(k,'')});return}
  if(x.s===400&&x.j.errors){Object.keys(x.j.errors).forEach(function(k){if(F[k])err(k,x.j.errors[k])});say('err','Please check the highlighted fields and try again.');return}
  if(x.s===429){say('err','Too many attempts. Please wait a few minutes and try again, or email me at '+mail+'.');return}
  say('err',"Your message could not be sent because the contact service isn't available right now. Please email me directly at "+mail+'.')})
 .catch(function(){say('err',"Your message could not be sent because the contact service isn't available right now. Please email me directly at "+mail+'.')})
 .then(function(){busy=false;btn.disabled=false;btn.removeAttribute('aria-busy');btn.textContent=lab})});
['name','email','company','subject','message'].forEach(function(k){F[k].addEventListener('input',function(){if(F[k].getAttribute('aria-invalid'))err(k,'')})});F.consent.addEventListener('change',function(){err('consent','')});
$('#cta-b').addEventListener('click',function(e){e.preventDefault();var s=document.getElementById('form');s.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});setTimeout(function(){F.name.focus({preventScroll:true})},reduce?0:600)});

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(function(){el.style.transitionDelay='';el.classList.add('done')},1000)})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(e,i){e.style.transitionDelay=Math.min([].indexOf.call(e.parentNode.children,e),5)*90+'ms';io.observe(e)});
var b=$('.burger'),m=$('.menu');b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};m.addEventListener('click',function(e){if(e.target.tagName==='A')m.classList.remove('open')});
})();
