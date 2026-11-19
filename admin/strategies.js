(function(){'use strict';
/* Strategies Management: list of strategy pages + a block-based page editor.
   Block types and their fields come from the server (S.meta.blocks), so a new block type needs no change here. */
var A=window.__admin,V=window.__V,H=V.helpers,api=A.api,h=A.h,S=A.S,toast=A.toast,fdt=A.fdt,btn=A.btn,buildForm=A.buildForm,confirmDlg=A.confirmDlg,modal=A.modal,head=H.head,loading=H.loading,errBox=H.errBox,status=H.status;
function make(CFG){var COL='/api/c/'+CFG.col;
var urlOf=function(slug){return slug==='overview'?CFG.base:CFG.base+'/'+slug};
var DEFAULTS={heading:{level:'2',toc:true},list:{style:'bullets'},callout:{tone:'principle'},cards:{columns:'3'},compare:{leftTone:'bad',rightTone:'good'},hub:{ring:'none'},buttons:{align:'left'}};
function clone(o){return JSON.parse(JSON.stringify(o))}
function summary(type,d){var s='';
 if(type==='heading')s='H'+(d.level||2)+' · '+(d.text||'(empty)');
 else if(type==='text')s=(d.text||'').replace(/\s+/g,' ').slice(0,110);
 else if(type==='list')s=(d.title?d.title+': ':'')+((d.items||[])[0]||'')+' ('+(d.items||[]).length+' items)';
 else if(type==='table')s=(d.caption||(d.columns||[]).join(' | '))+' ('+(d.rows||[]).length+' rows)';
 else if(type==='callout')s=(d.title||d.tone||'')+': '+(d.text||'').slice(0,80);
 else if(type==='cards')s=(d.cards||[]).length+' cards: '+(d.cards||[]).map(function(c){return c.title}).join(', ');
 else if(type==='case')s=d.name||'';
 else if(type==='keywordmap')s=d.primary||d.title||'';
 else if(type==='strategies')s='Lists every published strategy page automatically';
 else if(type==='buttons')s=(d.buttons||[]).map(function(b){return b.label}).join(' · ');
 else s=d.title||d.label||d.center||d.alt||d.leftTitle||'';
 return s}

/* ---------- list */
function list(root){var box=h('div');root.append(head(CFG.title,CFG.desc,h('a',{class:'btn pri',href:'#/'+CFG.route+'/new'},'+ New '+CFG.one.toLowerCase()+' page')),box);
 function load(){box.innerHTML='';box.append(loading());api('GET',COL).then(function(r){box.innerHTML='';
  var move=function(i,d){var ids=r.items.map(function(x){return x.id}),j=i+d;if(j<0||j>=ids.length)return;var t=ids[i];ids[i]=ids[j];ids[j]=t;api('POST',COL+'/reorder',{ids:ids}).then(function(){toast('Order saved');load()}).catch(function(e){toast(e.message,'err')})};
  box.append(h('div',{class:'tw'},h('table',{class:'tbl'},h('thead',null,h('tr',null,['Page','Address','Status','Updated',''].map(function(x){return h('th',null,x)}))),
   h('tbody',null,r.items.map(function(i,ix){var ov=i.slug==='overview';return h('tr',null,h('td',null,h('a',{class:'nm',href:'#/'+CFG.route+'/'+i.id},i.name||'(untitled)'),h('div',{class:'sub'},ov?'Overview page':CFG.one+' page')),h('td',{class:'sub'},urlOf(i.slug)),h('td',null,status(i)),h('td',{class:'sub'},fdt(i.updated_at)),
    h('td',{style:'white-space:nowrap;text-align:right'},ov?'':[h('button',{class:'btn sm','aria-label':'Move up',on:{click:function(){move(ix,-1)}}},'↑'),' ',h('button',{class:'btn sm','aria-label':'Move down',on:{click:function(){move(ix,1)}}},'↓'),' '],
     i.status==='published'?[h('a',{class:'btn sm',href:urlOf(i.slug),target:'_blank',rel:'noopener'},'View'),' ']:'',h('a',{class:'btn sm pri',href:'#/'+CFG.route+'/'+i.id},'Edit')))})))));
  box.append(h('p',{class:'help',style:'margin-top:12px'},CFG.orderHelp+' Pages that are not published are never public and are not in the sitemap.'))}).catch(function(e){box.innerHTML='';box.append(errBox(e,load))})}
 load()}

/* ---------- block editor */
function blocksEditor(initial,onChange){var defs=S.meta.blocks,items=[],wrap=h('div'),listEl=h('div');
 function mk(type,data,open){var it={type:type,data:data||{},form:null,open:!!open,el:null};build(it);return it}
 function cur(it){return it.form?it.form.get():it.data}
 function build(it){var def=defs[it.type],sm=h('span',{class:'sm'}),bb=h('div',{class:'bb'}),el=h('div',{class:'blk'+(it.type==='heading'&&String((cur(it)||{}).level)==='2'?' h2':'')});
  function upd(){sm.textContent=summary(it.type,cur(it));el.classList.toggle('h2',it.type==='heading'&&String(cur(it).level)==='2')}
  function open(){if(!it.form){it.form=buildForm(def.fields,it.data,upd);bb.append(h('p',{class:'help',style:'margin-bottom:10px'},def.desc),it.form.el)}bb.hidden=!it.open}
  function idx(){return items.indexOf(it)}
  function mv(d){return function(ev){ev.stopPropagation();var i=idx(),j=i+d;if(j<0||j>=items.length)return;items.splice(i,1);items.splice(j,0,it);draw();A.S.dirty=true;it.el.scrollIntoView({block:'nearest'});onChange()}}
  var tools=h('div',{class:'tl'},
   h('button',{class:'btn sm',type:'button','aria-label':'Move block up',on:{click:mv(-1)}},'↑'),h('button',{class:'btn sm',type:'button','aria-label':'Move block down',on:{click:mv(1)}},'↓'),
   h('button',{class:'btn sm',type:'button','aria-label':'Add a block below',title:'Add a block below',on:{click:function(ev){ev.stopPropagation();pickType().then(function(t){if(t)insert(t,idx()+1)})}}},'+'),
   h('button',{class:'btn sm',type:'button','aria-label':'Duplicate block',title:'Duplicate',on:{click:function(ev){ev.stopPropagation();var n=mk(it.type,clone(cur(it)),true);items.splice(idx()+1,0,n);draw();S.dirty=true;onChange()}}},'⧉'),
   h('button',{class:'btn sm dng',type:'button','aria-label':'Delete block',on:{click:function(ev){ev.stopPropagation();confirmDlg('Delete this block?','The block and its content will be removed from the page when you save.','Delete',true).then(function(ok){if(ok){items.splice(idx(),1);draw();S.dirty=true;onChange()}})}}},'✕'));
  var bh=h('div',{class:'bh',role:'button',tabindex:0,'aria-expanded':it.open?'true':'false',on:{click:function(){it.open=!it.open;bh.setAttribute('aria-expanded',it.open);open()},keydown:function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();bh.click()}}}},h('span',{class:'ty'},def.label),sm,tools);
  el.append(bh,bb);it.el=el;it.upd=upd;it.bb=bb;it.openFn=open;if(it.open)open();else bb.hidden=true;upd()}
 function draw(){listEl.innerHTML='';if(!items.length)listEl.append(h('div',{class:'empty'},'No content blocks yet. Add a heading or paragraph below.'));items.forEach(function(it){listEl.append(it.el)})}
 function insert(type,at){var it=mk(type,clone(DEFAULTS[type]||{}),true);if(at==null)items.push(it);else items.splice(at,0,it);draw();S.dirty=true;onChange();it.el.scrollIntoView({block:'center',behavior:'smooth'})}
 function pickType(){var p=h('div',{class:'tp'});var m=modal('Add a content block',p,function(c){return[h('button',{class:'btn',on:{click:function(){c(undefined)}}},'Cancel')]},true);
  S.meta.blockOrder.forEach(function(t){p.append(h('button',{type:'button',on:{click:function(ev){ev.currentTarget.closest('.mod')._close(t)}}},h('b',null,defs[t].label),h('span',null,defs[t].desc)))});return m}
 (initial||[]).forEach(function(b){var d=clone(b);var t=d.type;delete d.type;items.push(mk(t,d,false))});draw();
 var quick=h('div',{class:'bnew'},h('b',null,'Add:'),['heading','text','list','table','callout'].map(function(t){return h('button',{class:'btn sm',type:'button',on:{click:function(){insert(t)}}},defs[t].label)}),h('button',{class:'btn sm pri',type:'button',on:{click:function(){pickType().then(function(t){if(t)insert(t)})}}},'More blocks…'),h('span',{style:'flex:1'}),
  h('button',{class:'btn sm',type:'button',on:{click:function(){items.forEach(function(it){it.open=true;it.openFn();it.el.querySelector('.bh').setAttribute('aria-expanded','true')})}}},'Expand all'),h('button',{class:'btn sm',type:'button',on:{click:function(){items.forEach(function(it){it.open=false;it.bb.hidden=true;it.el.querySelector('.bh').setAttribute('aria-expanded','false')})}}},'Collapse all'));
 wrap.append(h('p',{class:'help',style:'margin-bottom:10px'},'Blocks appear on the page in this order. Use the arrows to reorder. Headings marked "Show in the table of contents" become anchor links. In text you can use **bold** and [link text](/strategies/on-page-seo) for internal links.'),quick,listEl,h('div',{class:'bnew'},h('button',{class:'btn pri',type:'button',on:{click:function(){pickType().then(function(t){if(t)insert(t)})}}},'+ Add block')));
 return{el:wrap,get:function(){return items.map(function(it){return Object.assign({type:it.type},cur(it))})},
  setErrors:function(errs){var by={};items.forEach(function(it){it.el.classList.remove('bad')});Object.keys(errs).forEach(function(k){var m=/^blocks\.(\d+)\.?(.*)$/.exec(k);if(!m||!m[2])return;(by[m[1]]=by[m[1]]||{})[m[2]]=errs[k]});var first=null;
   Object.keys(by).forEach(function(i){var it=items[+i];if(!it)return;it.open=true;it.openFn();it.el.querySelector('.bh').setAttribute('aria-expanded','true');it.form.setErrors(by[i]);it.el.classList.add('bad');if(!first)first=it.el});return first}}}

/* ---------- editor */
function starter(){return{kind:'strategy',section:CFG.section,title:'',toc:true,byline:true,heroEyebrow:'',heroHeading:'',heroIntro:'',heroButtons:[{label:'Explore the methodology',href:'#overview',style:'primary'},{label:'View My Portfolio',href:'/portfolio',style:'ghost'}],
 blocks:[{type:'heading',level:'2',text:'Overview',id:'overview',toc:true},{type:'text',text:''}],closeHeading:'Want to see this in practice?',closeText:'',closeButtons:[{label:'Explore My Portfolio',href:'/portfolio',style:'primary'},{label:"Let's Connect",href:'/contact',style:'ghost'}],relatedHeading:'Related projects, services and resources',related:[],cardTitle:'',cardText:'',cardFocus:[],cardCta:CFG.cta,cardIcon:'layers'}}
function editor(root,idSeg){var isNew=idSeg==='new',fields=S.meta.collections[CFG.col].fields.filter(function(f){return f.type!=='blocks'});root.append(loading());
 var p=isNew?Promise.resolve({doc:{id:0,status:'draft',dirty:false,slug:'',data:starter()}}):api('GET',COL+'/'+idSeg);
 return p.then(function(res){root.innerHTML='';var doc=res.doc,id=doc.id,data=doc.data;
  var form=buildForm(fields,data,function(){}),be=blocksEditor(data.blocks,function(){}),isOv=data.kind==='overview';S.dirty=false;
  var ti=form.by.title.input,si=form.by.slug.input,auto=!si.value||si.value===A.slugify(ti.value);
  ti.addEventListener('input',function(){if(auto&&(!id||doc.status!=='published'))si.value=A.slugify(ti.value)});si.addEventListener('input',function(){auto=false});
  if(!isNew){form.by.kind.input.disabled=true;if(isOv){si.disabled=true;si.value='overview'}}
  if(doc.status==='published'&&!isOv)form.by.slug.wrap.append(h('p',{class:'help'},'Changing the slug of a published page changes its address.'));
  var tabsDef=[['Page & hero',['Page','Hero']],['Content blocks',null],['Closing & related',['Closing CTA','Related links']],['Strategy card',['Strategy card']],['SEO',['SEO']]],tb=h('div',{class:'tabs',role:'tablist'}),tabBtns={};
  function show(n){tabsDef.forEach(function(t){tabBtns[t[0]].classList.toggle('on',t[0]===n)});Object.keys(form.groups).forEach(function(g){var on=false;tabsDef.forEach(function(t){if(t[0]===n&&t[1]&&t[1].indexOf(g)>-1)on=true});form.groups[g].hidden=!on});be.el.hidden=n!=='Content blocks'}
  tabsDef.forEach(function(t){tabBtns[t[0]]=h('button',{type:'button',role:'tab',on:{click:function(){show(t[0])}}},t[0]);tb.append(tabBtns[t[0]])});
  if(isOv)tabBtns['Strategy card'].hidden=true;
  var tabOfGroup=function(g){var r='Page & hero';tabsDef.forEach(function(t){if(t[1]&&t[1].indexOf(g)>-1)r=t[0]});return r};
  var groupOf={};fields.forEach(function(f){groupOf[f.key]=f.group});
  var stBox=h('span',null,status(doc));
  function applyErrors(errs){form.setErrors({});var top={},hasBlock=false;Object.keys(errs||{}).forEach(function(k){if(/^blocks\./.test(k))hasBlock=true;else top[k]=errs[k]});var tk=Object.keys(top)[0];
   if(tk){show(tabOfGroup(groupOf[tk.split('.')[0]]));form.setErrors(top)}else if(hasBlock)show('Content blocks');
   if(hasBlock){var f=be.setErrors(errs);if(f&&!tk)f.scrollIntoView({block:'center',behavior:'smooth'})}}
  function collect(){var d=form.get();d.blocks=be.get();d.kind=data.kind||d.kind;d.section=CFG.section;if(isOv){d.kind='overview';d.slug='overview'}return d}
  function save(){var d=collect();return(id?api('PUT',COL+'/'+id,{data:d}):api('POST',COL,{data:d})).then(function(r){S.dirty=false;applyErrors({});if(!id){id=r.id;history.replaceState(null,'','#/'+CFG.route+'/'+id);doc.id=id;doc.status='draft'}return true}).catch(function(e){if(e.data&&e.data.errors){applyErrors(e.data.errors);toast(e.message,'err');return false}throw e})}
  function refresh(){return api('GET',COL+'/'+id).then(function(r){doc=r.doc;stBox.innerHTML='';stBox.append(status(doc));draw()})}
  function publish(){return save().then(function(ok){if(!ok)return;return api('POST',COL+'/'+id+'/publish').then(function(){toast('Published. The public website has been updated.');return refresh()}).catch(function(e){if(e.data&&e.data.errors){applyErrors(e.data.errors);toast(e.message,'err')}else throw e})})}
  var bar=h('div',{class:'act'});
  function draw(){bar.innerHTML='';var pub=doc.status==='published';
   bar.append(btn('Save draft','',function(){return save().then(function(ok){if(ok){toast('Draft saved. Visitors do not see it until you publish.');return refresh()}})}),
    btn('Preview','',function(){return save().then(function(ok){if(ok)window.open('/preview/strategy/'+id,'_blank','noopener')})}),
    btn(pub?(doc.dirty?'Publish changes':'Republish'):'Publish','pri',publish));
   if(id&&pub)bar.append(btn('Unpublish','',function(){return confirmDlg('Unpublish this page?',(isOv?'The '+CFG.title+' page will return a "not found" error, and the '+CFG.title+' navigation link will lead nowhere until you publish it again. ':'')+'It will be removed from the public website, the sitemap and the overview cards, and returned to drafts.','Unpublish',true).then(function(ok){if(ok)return api('POST',COL+'/'+id+'/unpublish').then(function(){toast('Unpublished.');return refresh()})})}));
   if(id&&pub)bar.append(h('a',{class:'btn',href:urlOf(doc.slug),target:'_blank',rel:'noopener'},'View live page'));
   if(id&&!isOv)bar.append(btn('Delete','dng',function(){return confirmDlg('Delete permanently?','This '+CFG.one.toLowerCase()+' page will be deleted and cannot be recovered.','Delete',true).then(function(ok){if(ok)return api('DELETE',COL+'/'+id).then(function(){S.dirty=false;toast('Page deleted.');location.hash='#/strategies'})})}));
   bar.append(h('span',{class:'sp'}),stBox)}
  draw();root.append(head((isNew?'New '+CFG.one.toLowerCase()+' page':'Edit: '+(data.title||CFG.one.toLowerCase()+' page')),isOv?CFG.ovHelp:'',h('a',{class:'btn sm',href:'#/'+CFG.route},'← All '+CFG.one.toLowerCase()+' pages')),bar,tb,form.el,be.el);show('Page & hero')
 }).catch(function(e){root.innerHTML='';root.append(errBox(e,function(){window.__render()}))})}

return function(root,seg){if(!S.meta.blockOrder)S.meta.blockOrder=Object.keys(S.meta.blocks);return seg[1]?editor(root,seg[1]):list(root)}}
V.strategies=make({route:'strategies',col:'strategies',section:'strategies',base:'/strategies',title:'Strategies',one:'Strategy',cta:'Explore strategy',desc:'Manage the Strategies overview and every dedicated strategy page. Pages are published to /strategies and /strategies/<name>. To add a new strategy page, use the button; it appears automatically on the overview.',orderHelp:'Order controls the order of the strategy cards on the overview page.',ovHelp:'The overview page lives at /strategies. Its "Strategy cards" block lists every published strategy page automatically.'});
V.servicepages=make({route:'servicepages',col:'servicepages',section:'services',base:'/services',title:'Service pages',one:'Service',cta:'Explore service',desc:'Manage the Services overview (/services) and each dedicated service page (/services/<name>). The overview lists services in its "Card grid" block, so add, remove, reorder or re-link services there; its other blocks hold the approach, industries, results, tools, FAQs and the closing call to action.',orderHelp:'Order controls the order of the pages in this list and in the "Other services" cards.',ovHelp:'The Services overview lives at /services. Edit its blocks to change the service cards, approach, industries, strengths, results, tools, FAQs and closing call to action.'});
})();
