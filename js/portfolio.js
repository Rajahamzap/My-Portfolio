(function(){
var S=window.SITE,D=S.portfolio,$=function(s,r){return(r||document).querySelector(s)},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var P={linkedin:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13a3 3 0 016 0v4"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>'};

var all=D.projects.filter(function(p){return p.published}).sort(function(a,b){return a.order-b.order});
var cats=D.categories.filter(function(c){return all.some(function(p){return p.category===c.id})});
var tabs=$('#tabs'),grid=$('#grid'),count=$('#count'),cur='all';
tabs.innerHTML=[{id:'all',label:'All Projects'}].concat(cats).map(function(c){return'<button class="tab" data-c="'+c.id+'" aria-pressed="'+(c.id==='all')+'">'+c.label+'</button>'}).join('');
var arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(function(){el.style.transitionDelay='';el.classList.add('done')},1000)})},{threshold:.12});
function render(){
 var list=all.filter(function(p){return cur==='all'||p.category===cur});
 grid.innerHTML=list.map(function(p,i){var tag=p.page?'a':'button';return'<'+tag+' class="pcard rv" '+(p.page?'href="'+p.page+'"':'data-id="'+p.id+'" aria-haspopup="dialog"')+'><div class="shot"><img src="'+p.thumb+'" alt="'+p.alt+'" width="800" height="500" loading="'+(i<3?'eager':'lazy')+'"></div><div class="pb"><span class="cat">'+p.industry+'</span><h3>'+p.name+'</h3><p>'+p.summary+'</p><span class="more">'+(p.page?'View Case Study ':'View Details ')+arrow+'</span></div></'+tag+'>'}).join('');
 count.textContent='Showing '+list.length+' project'+(list.length===1?'':'s');
 [].forEach.call(grid.children,function(el,i){el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
}
tabs.onclick=function(e){var b=e.target.closest('.tab');if(!b||b.dataset.c===cur)return;cur=b.dataset.c;[].forEach.call(tabs.children,function(t){t.setAttribute('aria-pressed',t===b)});grid.classList.add('out');setTimeout(function(){render();grid.classList.remove('out')},reduce?0:200)};
render();
/* modal */
var m=document.createElement('div');m.className='modal';m.hidden=true;
m.innerHTML='<div class="mbk" data-x></div><div class="mdl" role="dialog" aria-modal="true" aria-labelledby="mt"><button class="mx" data-x aria-label="Close project details">&times;</button><img alt="" width="800" height="500"><div class="mb"></div></div>';
document.body.appendChild(m);
var dlg=$('.mdl',m),last=null;
function X(p){var E=function(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})},o='';[['overview','Project overview'],['role','My role and responsibilities'],['challenges','SEO challenges'],['strategy','SEO strategy'],['implementation','Implementation'],['results','Results and achievements']].forEach(function(f){if(p[f[0]])o+='<h4>'+f[1]+'</h4><p class="nt" style="margin:0;white-space:pre-line">'+E(p[f[0]])+'</p>'});var t=(p.tools||[]).concat(p.tags||[]);if(t.length)o+='<h4>Tools and tags</h4><ul class="cl">'+t.map(function(x){return'<li>'+E(x)+'</li>'}).join('')+'</ul>';return o}
function open(id){var p=all.filter(function(x){return x.id===id})[0];if(!p)return;last=document.activeElement;
 var site=p.type==='site',img=$('img',dlg);img.src=p.image;img.alt=p.alt;
 $('.mb',dlg).innerHTML='<span class="cat">'+p.industry+'</span><h2 id="mt">'+p.name+'</h2>'+(p.url?'<a class="url" href="https://'+p.url+'" target="_blank" rel="noopener">'+p.url+'</a>':'')+'<p>'+p.summary+'</p>'+X(p)+'<h4>'+(site?'SEO contributions':'Focus areas')+'</h4><ul class="cl">'+p.contrib.map(function(c){return'<li>'+c+'</li>'}).join('')+'</ul>'+
 (site?'<h4>Verified performance highlights</h4>'+(p.metrics.length?'<ul class="met">'+p.metrics.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>':'<p class="nt">Performance figures for this project are not published.</p>'):'<p class="nt" style="margin-top:22px">Capability overview. This is not a completed client case study.</p>');
 var sw=innerWidth-document.documentElement.clientWidth;document.body.style.overflow='hidden';if(sw)document.body.style.paddingRight=sw+'px';
 m.hidden=false;dlg.scrollTop=0;requestAnimationFrame(function(){requestAnimationFrame(function(){m.classList.add('open')})});$('.mx',m).focus({preventScroll:true})}
function close(){if(m.hidden)return;m.classList.remove('open');setTimeout(function(){m.hidden=true;document.body.style.overflow='';document.body.style.paddingRight='';if(last)last.focus({preventScroll:true})},reduce?0:250)}
grid.onclick=function(e){var c=e.target.closest('button.pcard');if(c)open(c.dataset.id)};
m.addEventListener('click',function(e){if(e.target.closest('[data-x]'))close()});
document.addEventListener('keydown',function(e){if(m.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){var f=dlg.querySelectorAll('a[href],button'),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
/* nav */
var b=$('.burger'),mn=$('.menu');b.onclick=function(){var o=mn.classList.toggle('open');b.setAttribute('aria-expanded',o)};
mn.addEventListener('click',function(e){if(e.target.tagName==='A')mn.classList.remove('open')});
})();
