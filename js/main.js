(function(){
var S=window.SITE,$=function(s,r){return(r||document).querySelector(s)},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var P={chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',doc:'<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7"/>',net:'<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M11 7.3L6 16.7M13 7.3l5 9.4M7.5 19h9"/>',link:'<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',pin:'<path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',ai:'<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M9.5 15l2.5-6 2.5 6M10.3 13h3.4"/>',cloud:'<path d="M7 18a4.5 4.5 0 01-.5-9A6 6 0 0118 10a4 4 0 010 8z"/>',shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',heart:'<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 018-2.7A4.5 4.5 0 0120 9c0 6.2-8 11-8 11z"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M18 14.5a6 6 0 013.5 5.5"/>',linkedin:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13a3 3 0 016 0v4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>'};
var ic=function(n){return'<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24">'+P[n]+'</svg></span>'};
function put(id,h){var e=document.getElementById(id);if(e)e.innerHTML=h}
$('#profile-img').src=S.profileImage;
document.querySelectorAll('[data-email]').forEach(function(a){a.href=S.social.email;if(a.dataset.email==='text')a.textContent=S.email});
put('indicators',S.indicators.map(function(t){return'<li>'+t+'</li>'}).join(''));
put('stats',S.stats.map(function(s){return'<div class="stat"><b data-to="'+s.to+'" data-dec="'+s.dec+'" data-suffix="'+s.suffix+'">'+s.to.toFixed(s.dec)+s.suffix+'</b><span>'+s.label+'</span></div>'}).join(''));
put('stats-note',S.statsNote);
put('highlights',S.highlights.map(function(h){return'<li>'+ic(h.icon)+h.t+'</li>'}).join(''));
put('services-grid',S.services.map(function(s){return'<article class="card rv">'+ic(s.icon)+'<h3>'+s.t+'</h3><p>'+s.d+'</p></article>'}).join(''));
put('projects-grid',S.projects.map(function(p){return'<article class="proj rv"><div class="shot"><img src="'+p.img+'" alt="'+p.alt+'" loading="lazy" width="800" height="500"></div><div class="pb"><span class="cat">'+p.cat+'</span><h3>'+p.name+'</h3><p>'+p.d+'</p><ul class="met" aria-label="Key metrics">'+p.m.map(function(m){return'<li>'+m+'</li>'}).join('')+'</ul><p class="contrib"><b>My contributions</b>'+p.c+'</p><a class="btn ghost" href="'+(p.page||'case-study.html?project='+p.slug)+'">View Case Study</a></div></article>'}).join(''));
put('toolkit',S.toolkit.map(function(g){return'<div class="card rv"><h3>'+g.t+'</h3><ul class="badges">'+g.i.map(function(i){return'<li>'+i+'</li>'}).join('')+'</ul></div>'}).join(''));
put('industries',S.industries.map(function(i){return'<li>'+ic(i.icon)+i.t+'</li>'}).join(''));


function count(el){var to=+el.dataset.to,d=+el.dataset.dec,sfx=el.dataset.suffix;if(reduce){el.textContent=to.toFixed(d)+sfx;return}var t0=performance.now();(function f(t){var p=Math.min((t-t0)/1600,1),e=1-Math.pow(1-p,3);el.textContent=(to*e).toFixed(d)+sfx;if(p<1)requestAnimationFrame(f)})(t0)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');e.target.querySelectorAll('[data-to]').forEach(count);io.unobserve(e.target)})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e,i){e.style.transitionDelay=(i%3)*90+'ms';io.observe(e)});
var b=$('.burger'),m=$('.menu');b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}});
var links=[].slice.call(m.querySelectorAll('a[href^="#"]')),so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
links.forEach(function(a){var s=$(a.getAttribute('href'));if(s)so.observe(s)});
})();
