(function(){
var S=window.SITE,A=S.about,I=window.ICONS,$=function(s,r){return(r||document).querySelector(s)},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var ic=function(n){return'<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24">'+I[n]+'</svg></span>'},sv=function(n){return'<svg viewBox="0 0 24 24" aria-hidden="true">'+I[n]+'</svg>'};
function put(id,h){var e=document.getElementById(id);if(e)e.innerHTML=h}
var img=$('#profile-img');img.src=A.image;img.alt=A.imageAlt;
put('intro',A.intro.map(function(p){return'<p>'+p+'</p>'}).join(''));
put('journey-text',A.journey.map(function(p){return'<p class="rv">'+p+'</p>'}).join(''));
put('timeline',A.experience.map(function(e){return'<div class="tli rv"><p class="when">'+e.when+'</p><h3>'+e.role+'</h3><p class="org">'+e.org+'</p><p>'+e.d+'</p></div>'}).join(''));
put('ind-intro',A.industriesIntro);
put('industries',A.industries.map(function(i){return'<article class="card rv">'+ic(i.icon)+'<h3>'+i.t+'</h3><p>'+i.d+'</p></article>'}).join(''));
put('ap-intro',A.approachIntro);
put('approach',A.approach.map(function(a,i){return'<div class="apb rv"><b aria-hidden="true">'+(i+1)+'</b><h3>'+a.t+'</h3><p>'+a.d+'</p></div>'}).join(''));
put('skills',A.skills.map(function(g){return'<div class="xg rv"><div class="t">'+ic(g.icon)+'<h3>'+g.t+'</h3></div><ul>'+g.i.map(function(x){return'<li>'+sv('check')+x+'</li>'}).join('')+'</ul></div>'}).join(''));
put('tools',A.tools.map(function(g){return'<div class="card rv"><h3>'+g.t+'</h3><ul class="badges">'+g.i.map(function(i){return'<li>'+i+'</li>'}).join('')+'</ul></div>'}).join(''));
put('ach',A.achievements.map(function(a){return'<div class="am rv"><h3>'+a.name+'</h3>'+a.items.map(function(x){var p=x.prefix||'',s=x.suffix||'';return'<div><b data-to="'+x.to+'" data-p="'+p+'" data-s="'+s+'">'+p+x.to+s+'</b><span>'+x.label+'</span></div>'}).join('')+'</div>'}).join(''));
put('ach-note',A.achievementsNote);put('learning',A.learning);
put('certs',A.certs.map(function(c){return'<li class="rv"><svg viewBox="0 0 24 24" aria-hidden="true">'+I.award+'</svg>'+c+'</li>'}).join(''));
put('phil',A.philosophy.map(function(p){return'<p class="rv">'+p+'</p>'}).join(''));
document.querySelectorAll('[data-email]').forEach(function(a){a.href=S.social.email});

function count(el){var to=+el.dataset.to,p=el.dataset.p,s=el.dataset.s;if(reduce)return;var t0=performance.now();(function f(t){var k=Math.min((t-t0)/1600,1);el.textContent=p+Math.round(to*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');el.querySelectorAll('[data-to]').forEach(count);io.unobserve(el);setTimeout(function(){el.style.transitionDelay='';el.classList.add('done')},1200)})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e,i){var sib=[].indexOf.call(e.parentNode.children,e);e.style.transitionDelay=Math.min(sib,5)*110+'ms';io.observe(e)});
var b=$('.burger'),m=$('.menu');b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};
m.addEventListener('click',function(e){if(e.target.tagName==='A')m.classList.remove('open')});
})();
