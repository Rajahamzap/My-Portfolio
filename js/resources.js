(function(){
var S=window.SITE,D=window.RESOURCES,I=window.ICONS,A=D.articles,C=D.categories,$=function(s){return document.querySelector(s)},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var cn={};C.forEach(function(c){cn[c.id]=c});
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fd(d){if(!d)return'Date TBD';var p=d.split('-');return MO[+p[1]-1]+' '+(+p[2])+', '+p[0]}
function rt(a){return a.readingTime?a.readingTime+' min read':'Reading time TBD'}
var arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var smp=function(a){return a.status==='placeholder'?'<span class="smp">Sample placeholder</span>':''};
function card(a){return'<article class="acard rv"><div class="shot"><img src="'+a.image+'" alt="'+esc(a.imageAlt)+'" width="800" height="500" loading="lazy"></div><div class="pb"><span class="cat">'+esc(cn[a.category].label)+'</span>'+smp(a)+'<h3>'+esc(a.title)+'</h3><p>'+esc(a.description)+'</p><p class="am">'+esc(a.author)+' &middot; '+fd(a.date)+' &middot; '+rt(a)+'</p><a class="more" href="resources/'+a.slug+'.html">Read More '+arrow+'</a></div></article>'}
/* only published articles (and placeholders when enabled) are ever in the data; drafts are filtered at build time and again here */
A=A.filter(function(a){return a.status==='published'||(a.status==='placeholder'&&D.config.showPlaceholders)});
var cur='all',q='',tabs=$('#tabs'),grid=$('#grid'),count=$('#count'),none=$('#none'),note=$('#note'),input=$('#q'),clr=$('#qc'),chips=$('#chips');
var feat=A.filter(function(a){return a.featured})[0];
if(!A.length){var tb=document.querySelector('.topicbar');if(tb)tb.hidden=true;document.getElementById('none-b').textContent='New articles are on the way.';document.getElementById('none-t').textContent='Check back soon for SEO guides and insights.';document.getElementById('reset').hidden=true}
if(feat)$('#feat').innerHTML='<div class="shot"><img src="'+feat.image+'" alt="'+esc(feat.imageAlt)+'" width="800" height="500"></div><div class="fb"><p class="flab">FEATURED INSIGHT</p>'+smp(feat)+'<span class="cat">'+esc(cn[feat.category].label)+'</span><h2>'+esc(feat.title)+'</h2><p>'+esc(feat.description)+'</p><p class="am">'+esc(feat.author)+' &middot; '+fd(feat.date)+' &middot; '+rt(feat)+'</p><a class="btn" href="resources/'+feat.slug+'.html">Read Article</a></div>';else $('#feat-sec').hidden=true;
tabs.innerHTML=[{id:'all',label:'All Articles'}].concat(C).map(function(c){return'<button class="tab" data-c="'+c.id+'" aria-pressed="'+(c.id==='all')+'">'+esc(c.label)+'</button>'}).join('');
function hay(a){return(a.title+' '+a.description+' '+cn[a.category].label+' '+a.tags.join(' ')).toLowerCase()}
function match(a,t){return t.every(function(w){return hay(a).indexOf(w)>-1})}
function result(){var t=q.toLowerCase().split(/\s+/).filter(Boolean),base=A.filter(function(a){return cur==='all'||a.category===cur}),r=t.length?base.filter(function(a){return match(a,t)}):base,fb=false;
 if(t.length&&!r.length&&cur!=='all'){var all=A.filter(function(a){return match(a,t)});if(all.length){r=all;fb=true}}return{list:r,fallback:fb}}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(function(){el.style.transitionDelay='';el.classList.add('done')},1000)})},{threshold:.1});
function render(){var r=result();grid.innerHTML=r.list.map(card).join('');
 count.textContent=r.list.length?'Showing '+r.list.length+' article'+(r.list.length===1?'':'s'):'';
 none.classList.toggle('show',!r.list.length||!A.length);note.classList.toggle('show',r.fallback);
 if(r.fallback)note.textContent='No matches in '+cn[cur].label+'. Showing results from all topics.';
 clr.classList.toggle('show',!!q);
 [].forEach.call(grid.children,function(el,i){el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)})}
function update(fast){grid.classList.add('out');setTimeout(function(){render();grid.classList.remove('out')},reduce||fast?0:160)}
function showChips(){var c=cn[cur];chips.innerHTML=c?c.topics.map(function(t){return'<button class="chip" aria-pressed="'+(q.toLowerCase()===t.toLowerCase())+'">'+esc(t)+'</button>'}).join(''):''}
function setCat(id,hash){cur=id;[].forEach.call(tabs.children,function(t){t.setAttribute('aria-pressed',t.dataset.c===id)});showChips();if(hash)history.replaceState(null,'',id==='all'?location.pathname:'#'+id)}
tabs.onclick=function(e){var b=e.target.closest('.tab');if(!b||b.dataset.c===cur)return;setCat(b.dataset.c,true);update()};
chips.onclick=function(e){var b=e.target.closest('.chip');if(!b)return;q=q.toLowerCase()===b.textContent.toLowerCase()?'':b.textContent;input.value=q;showChips();update()};
var tm;input.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(function(){q=input.value.trim();showChips();update(true)},150)});
function reset(){q='';input.value='';setCat('all',true);update(true);input.focus()}
clr.onclick=function(){q='';input.value='';showChips();update(true);input.focus()};$('#reset').onclick=reset;
$('#sf').addEventListener('submit',function(e){e.preventDefault()});
function fromHash(){var h=location.hash.slice(1);setCat(cn[h]?h:'all')}
addEventListener('hashchange',function(){fromHash();update(true)});fromHash();render();
/* newsletter: frontend only until an email service endpoint is configured in data/resources.json */
var f=$('#nlf'),em=$('#nle'),st=$('#nls');
f.addEventListener('submit',function(e){e.preventDefault();var v=em.value.trim();st.className='nls';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){em.setAttribute('aria-invalid','true');st.classList.add('err');st.textContent='Please enter a valid email address.';return}
 em.removeAttribute('aria-invalid');var ep=D.config.newsletterEndpoint;
 if(!ep){st.textContent='Subscriptions are not connected yet, so nothing was saved. This form is ready to be linked to an email service.';return}
 fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:v})}).then(function(r){if(!r.ok)throw 0;st.classList.add('ok');st.textContent='Thanks. You are subscribed.';f.reset()}).catch(function(){st.classList.add('err');st.textContent='Something went wrong. Please try again later.'})});
document.querySelectorAll('[data-email]').forEach(function(a){a.href=S.social.email});

var b=$('.burger'),m=$('.menu');b.onclick=function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};
document.querySelectorAll('.rv:not(.acard)').forEach(function(e){io.observe(e)});
})();
