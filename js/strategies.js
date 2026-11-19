(function(){var $=function(s,r){return(r||document).querySelector(s)},all=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var b=$('.burger'),m=$('.menu');if(b&&m){b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}})}
/* scroll reveal */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -4% 0px'});all('.rv').forEach(function(e){io.observe(e)})}else all('.rv').forEach(function(e){e.classList.add('in')});
/* table of contents: collapsed on small screens, open on desktop; scroll spy */
var toc=$('.sx-toc details');if(toc){var mq=matchMedia('(max-width:1000px)');var sync=function(){toc.open=!mq.matches};sync();(mq.addEventListener?mq.addEventListener('change',sync):mq.addListener(sync));
 var links=all('.sx-toc a'),hs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))}).filter(Boolean),tk=false;
 function spy(){tk=false;var cur=null;hs.forEach(function(h){if(h.getBoundingClientRect().top<=150)cur=h});links.forEach(function(a){var on=cur&&a.getAttribute('href')==='#'+cur.id;a.classList.toggle('on',!!on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
 addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(spy)}},{passive:true});spy();
 links.forEach(function(a){a.addEventListener('click',function(){if(mq.matches)toc.open=false})})}
/* back to top */
var top=$('.sx-top');if(top){var t2=false;function vis(){t2=false;top.hidden=scrollY<700}addEventListener('scroll',function(){if(!t2){t2=true;requestAnimationFrame(vis)}},{passive:true});vis()}
})();
