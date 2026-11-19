(function(){
var S=window.SITE,I=window.ICONS,$=function(s){return document.querySelector(s)};

document.querySelectorAll('[data-email]').forEach(function(a){a.href=S.social.email});
var u=encodeURIComponent(document.querySelector('link[rel=canonical]').href),t=encodeURIComponent(document.querySelector('h1').textContent);
var L={linkedin:'https://www.linkedin.com/sharing/share-offsite/?url='+u,facebook:'https://www.facebook.com/sharer/sharer.php?u='+u,x:'https://twitter.com/intent/tweet?url='+u+'&text='+t};
document.querySelectorAll('[data-share]').forEach(function(a){a.href=L[a.dataset.share]});
var links=[].slice.call(document.querySelectorAll('.toc a')),hs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))}).filter(Boolean);
if(hs.length){var tk=false;function spy(){tk=false;var cur=hs[0];hs.forEach(function(h){if(h.getBoundingClientRect().top<=140)cur=h});links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur.id)})}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(spy)}},{passive:true});spy()}
var b=$('.burger'),m=$('.menu');b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.rv').forEach(function(e,i){e.style.transitionDelay=(i%3)*90+'ms';io.observe(e)});
})();
