(function(){var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,$=function(s){return document.querySelector(s)};
var b=$('.burger'),m=$('.menu');if(b)b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};
function count(el){var n=parseFloat(el.dataset.num),pre=el.dataset.pre||'',suf=el.dataset.suf||'',com=el.dataset.com==='1',dec=(el.dataset.num.split('.')[1]||'').length;if(reduce||!isFinite(n))return;var t0=performance.now();(function f(t){var k=Math.min((t-t0)/1500,1),e=1-Math.pow(1-k,3),v=n*e;var s=dec?v.toFixed(dec):Math.round(v).toString();if(com)s=s.replace(/\B(?=(\d{3})+(?!\d))/g,',');el.textContent=pre+s+suf;if(k<1)requestAnimationFrame(f);else el.textContent=pre+(com?n.toLocaleString('en-US'):el.dataset.num)+suf})(t0)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');el.querySelectorAll('[data-num]').forEach(count);io.unobserve(el);setTimeout(function(){el.style.transitionDelay='';el.classList.add('done')},1000)})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(e){e.style.transitionDelay=Math.min([].indexOf.call(e.parentNode.children,e),5)*90+'ms';io.observe(e)});
document.querySelectorAll('.stg b[data-num]').forEach(count);
document.querySelectorAll('[data-expand]').forEach(function(x){x.addEventListener('click',function(){var o=x.getAttribute('data-expand')==='1';document.querySelectorAll('.sx').forEach(function(d){d.open=o})})});
})();
