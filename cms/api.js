'use strict';
const fs=require('fs'),path=require('path');
const{now,today,rid,sha,slugify,readJson,readBody,esc}=require('./util'),A=require('./auth'),Sch=require('./schemas'),pub=require('./publish'),{tx}=require('./db');
const ROOT=path.join(__dirname,'..'),UP=path.join(ROOT,'uploads');
const J=(s,o)=>({s,o}),ERR=(s,m,extra)=>({s,o:Object.assign({ok:false,error:m},extra)});
const stable=o=>JSON.stringify(o,(k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).sort().reduce((a,x)=>(a[x]=v[x],a),{}):v);
const LIM={png:8e6,jpg:8e6,webp:8e6,gif:8e6,pdf:10e6};
function sniff(b){if(b.length<12)return null;if(b[0]===0x89&&b.toString('latin1',1,4)==='PNG')return['png','image/png'];if(b[0]===0xFF&&b[1]===0xD8&&b[2]===0xFF)return['jpg','image/jpeg'];if(b.toString('latin1',0,4)==='RIFF'&&b.toString('latin1',8,12)==='WEBP')return['webp','image/webp'];if(b.toString('latin1',0,4)==='GIF8')return['gif','image/gif'];if(b.toString('latin1',0,4)==='%PDF')return['pdf','application/pdf'];return null}
function make(ctx){const{db,env}=ctx;
 const log=(u,a,t)=>db.prepare('INSERT INTO activity(at,user,action,target) VALUES(?,?,?,?)').run(now(),u.email,a,t||'');
 const rebuild=()=>pub.buildSite(db);
 const row=(col,id)=>db.prepare('SELECT * FROM docs WHERE collection=? AND id=?').get(col,id);
 const single=k=>db.prepare("SELECT * FROM docs WHERE collection='single' AND slug=?").get(k);
 const label=(col,d)=>col==='articles'?d.title:col==='single'?'':d.name||d.title;
 function fill(fields,d){const o=Object.assign({},d);for(const f of fields)if(o[f.key]===undefined)o[f.key]=f.type==='toggle'?false:(f.type==='list'||f.type==='repeater')?[]:'';return o}
 function sumOf(col,r){const d=JSON.parse(r.data);return{id:r.id,slug:r.slug,status:r.status,ord:r.ord,name:d.name||d.title,category:d.category||'',industry:d.industry||'',featured:!!d.featured,date:d.date||'',updated_at:r.updated_at,published_at:r.published_at,publish_at:r.publish_at,dirty:r.status==='published'&&r.published&&stable(JSON.parse(r.published))!==stable(d),image:d.image||'',tags:d.tags||[],short:d.short||d.description||d.summary||'',section:d.section||''}}
 function checkDoc(col,data,id,full){const sc=Sch.COLLECTIONS[col],r=Sch.clean(sc.fields,data),e=r.err,d=r.out;
  if(!full)for(const k of Object.keys(e))if(e[k]==='Required'&&!['name','title'].includes(k))delete e[k];
  if(!d.slug)d.slug=slugify(d.name||d.title||'');if(!d.slug&&!e.name&&!e.title&&!((col==='strategies'||col==='servicepages')&&d.kind==='overview'))e.slug='Required';
  if(d.slug&&db.prepare('SELECT id FROM docs WHERE collection=? AND slug=? AND id<>?').get(col,d.slug,id||0))e.slug='This slug is already in use';
  if(col==='strategies'||col==='servicepages'){d.section=col==='servicepages'?'services':'strategies';if(d.kind==='overview')d.slug='overview';else if(d.slug==='overview'||d.slug==='index')e.slug='This slug is reserved';
   if(d.kind==='overview'&&db.prepare("SELECT id FROM docs WHERE collection=? AND id<>? AND json_extract(data,'$.kind')='overview'").get(col,id||0))e.kind='There is already an overview page. Use a dedicated strategy page instead.'}
  if(col==='articles'&&!e.title&&!d.author)d.author=(JSON.parse(single('profile').data)||{}).name||'';
  if(col==='articles'&&full&&!d.content)e.content='Add some content before publishing';
  if(col==='certifications'&&d.verifyUrl&&!/^https?:\/\//i.test(d.verifyUrl))e.verifyUrl='Use a full link starting with https://';
  return{d,e}}
 function unfeature(col,exceptId){for(const r of db.prepare('SELECT id,data,published FROM docs WHERE collection=? AND id<>?').all(col,exceptId)){const a=JSON.parse(r.data),b=r.published?JSON.parse(r.published):null;if(a.featured||(b&&b.featured)){a.featured=false;if(b)b.featured=false;db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(JSON.stringify(a),b?JSON.stringify(b):null,r.id)}}}
 function doPublish(col,id,user,at){const r=row(col,id);const{d,e}=checkDoc(col,JSON.parse(r.data),id,true);if(Object.keys(e).length)return ERR(400,'Fix the highlighted fields before publishing.',{errors:e});
  if(col==='articles'){if(!d.date)d.date=today();d.updated=today()}if(d.featured&&col==='articles')unfeature(col,id);
  const j=JSON.stringify(d);db.prepare("UPDATE docs SET data=?,published=?,slug=?,status='published',published_at=COALESCE(published_at,?),publish_at=NULL,updated_at=? WHERE id=?").run(j,j,d.slug,now(),now(),id);
  try{rebuild()}catch(x){console.error('rebuild failed',x);return ERR(500,'Saved, but the public site could not be rebuilt: '+x.message)}
  log(user,'published '+col.slice(0,-1),label(col,d));return J(200,{ok:true,doc:sumOf(col,row(col,id))})}
 const R=[];const add=(m,re,fn,o={})=>R.push({m,re,fn,o});
 /* ---------- meta + dashboard */
 add('GET',/^\/api\/meta$/,()=>J(200,{ok:true,schemas:Sch.SCHEMAS,collections:Object.fromEntries(Object.entries(Sch.COLLECTIONS).map(([k,v])=>[k,{label:v.label,statuses:v.statuses,fields:v.fields}])),blocks:Sch.BLOCKS,certCategories:Sch.CERT_CATEGORIES,projectCategories:Sch.PROJECT_CATEGORIES,articleCategories:Sch.ARTICLE_CATEGORIES,icons:Sch.ICONS,pages:Object.keys(Sch.PAGE_LABELS).map(k=>({key:k,label:Sch.PAGE_LABELS[k]})),emailConfigured:!!(env.RESEND_API_KEY&&env.CONTACT_TO_EMAIL&&env.CONTACT_FROM_EMAIL)}));
 add('GET',/^\/api\/dashboard$/,()=>{const c=(col,st)=>db.prepare('SELECT COUNT(*) n FROM docs WHERE collection=? AND status=?').get(col,st).n;const q=s=>db.prepare(s).get().n;
  const recent=(col,n)=>db.prepare('SELECT * FROM docs WHERE collection=? ORDER BY updated_at DESC LIMIT ?').all(col,n).map(r=>sumOf(col,r));
  return J(200,{ok:true,counts:{projects:c('projects','published'),articles:c('articles','published'),drafts:c('articles','draft'),scheduled:c('articles','scheduled'),strategies:c('strategies','published'),inquiries:q('SELECT COUNT(*) n FROM inquiries'),unread:q('SELECT COUNT(*) n FROM inquiries WHERE is_read=0')},
   pages:db.prepare("SELECT slug,updated_at,published_at FROM docs WHERE collection='single' AND slug LIKE 'page:%' ORDER BY updated_at DESC LIMIT 6").all().map(r=>({key:r.slug.slice(5),label:Sch.PAGE_LABELS[r.slug.slice(5)],updated_at:r.updated_at})),
   articles:db.prepare("SELECT * FROM docs WHERE collection='articles' AND status='published' ORDER BY published_at DESC LIMIT 5").all().map(r=>sumOf('articles',r)),projects:recent('projects',5),
   inquiries:db.prepare('SELECT id,name,subject,created_at,is_read,status FROM inquiries ORDER BY id DESC LIMIT 5').all(),activity:db.prepare('SELECT at,user,action,target FROM activity ORDER BY id DESC LIMIT 12').all(),
   analytics:'Traffic analytics are not connected. Add Google Analytics 4 or Search Console to see visitor statistics here.'})});
 /* ---------- singletons */
 add('GET',/^\/api\/singleton\/([\w:]+)$/,(rq,k)=>{const sc=Sch.SCHEMAS[k],r=sc&&single(k);if(!r)return ERR(404,'Not found');const d=fill(sc.fields,JSON.parse(r.data));if(sc.sections)d.sections=JSON.parse(r.data).sections||[];return J(200,{ok:true,key:k,data:d,dirty:stable(JSON.parse(r.data))!==stable(JSON.parse(r.published||r.data)),updated_at:r.updated_at,published_at:r.published_at})});
 add('PUT',/^\/api\/singleton\/([\w:]+)$/,(rq,k,body,u)=>{const sc=Sch.SCHEMAS[k],r=sc&&single(k);if(!r)return ERR(404,'Not found');const old=JSON.parse(r.data);const{out,err}=Sch.clean(sc.fields,body.data);
  if(k==='profile'&&out.email&&!A.EMAIL.test(out.email))err.email='Enter a valid email address';
  if(k==='seo'&&out.siteUrl&&!/^https?:\/\/[^\s/]+(\/[^\s]*)?$/.test(out.siteUrl))err.siteUrl='Enter a full URL starting with https://';
  if(k==='seo'&&out.siteNoindex&&!old.siteNoindex&&body.confirmNoindex!==true)return ERR(400,'Confirmation required: blocking all search engines hides the whole website from Google.',{needsConfirm:'noindex'});
  if(sc.sections){const allowed=new Map(Sch.SECTIONS[k.slice(5)].map(s=>[s[0],!!s[2]]));const seen=new Set();let s=(Array.isArray(body.data&&body.data.sections)?body.data.sections:[]).filter(x=>x&&allowed.has(x.key)&&!seen.has(x.key)&&seen.add(x.key)).map(x=>({key:x.key,enabled:allowed.get(x.key)?true:x.enabled!==false}));for(const[n]of allowed)if(!seen.has(n))s.push({key:n,enabled:true});out.sections=s}
  if(Object.keys(err).length)return ERR(400,'Please fix the highlighted fields.',{errors:err});
  db.prepare('UPDATE docs SET data=?,updated_at=? WHERE id=?').run(JSON.stringify(out),now(),r.id);log(u,'saved draft',sc.label);return J(200,{ok:true,data:out})});
 add('POST',/^\/api\/singleton\/([\w:]+)\/publish$/,(rq,k,body,u)=>{const r=single(k);if(!Sch.SCHEMAS[k]||!r)return ERR(404,'Not found');db.prepare("UPDATE docs SET published=data,published_at=?,updated_at=updated_at WHERE id=?").run(now(),r.id);
  try{rebuild()}catch(x){console.error(x);return ERR(500,'Saved, but the public site could not be rebuilt: '+x.message)}log(u,'published',Sch.SCHEMAS[k].label);return J(200,{ok:true})});
 add('POST',/^\/api\/singleton\/([\w:]+)\/discard$/,(rq,k,body,u)=>{const r=single(k);if(!Sch.SCHEMAS[k]||!r||!r.published)return ERR(404,'Not found');db.prepare('UPDATE docs SET data=?,updated_at=? WHERE id=?').run(r.published,now(),r.id);log(u,'discarded draft changes',Sch.SCHEMAS[k].label);return J(200,{ok:true})});
 /* ---------- collections */
 const colOk=c=>Sch.COLLECTIONS[c];
 add('GET',/^\/api\/c\/(\w+)$/,(rq,c)=>{if(!colOk(c))return ERR(404,'Not found');const p=rq.url.searchParams,q=(p.get('q')||'').toLowerCase(),st=p.get('status'),cat=p.get('category');let rows=db.prepare('SELECT * FROM docs WHERE collection=? ORDER BY ord,id').all(c).map(r=>sumOf(c,r));
  if(st)rows=rows.filter(r=>r.status===st);if(cat)rows=rows.filter(r=>r.category===cat);if(q)rows=rows.filter(r=>(r.name+' '+r.slug+' '+r.short+' '+r.tags.join(' ')).toLowerCase().includes(q));
  if(c==='articles')rows.sort((a,b)=>(b.updated_at||'').localeCompare(a.updated_at||''));return J(200,{ok:true,items:rows,total:rows.length})});
 add('GET',/^\/api\/c\/(\w+)\/(\d+)$/,(rq,c,id)=>{const r=colOk(c)&&row(c,id);if(!r)return ERR(404,'Not found');const s=sumOf(c,r);return J(200,{ok:true,doc:Object.assign(s,{data:fill(Sch.COLLECTIONS[c].fields,JSON.parse(r.data))})})});
 add('POST',/^\/api\/c\/(\w+)$/,(rq,c,body,u)=>{if(!colOk(c))return ERR(404,'Not found');const{d,e}=checkDoc(c,body.data,0,false);if(Object.keys(e).length)return ERR(400,'Please fix the highlighted fields.',{errors:e});
  const ord=(db.prepare('SELECT COALESCE(MAX(ord),0)+1 n FROM docs WHERE collection=?').get(c).n);const t=now();const r=db.prepare("INSERT INTO docs(collection,slug,data,status,ord,created_at,updated_at) VALUES(?,?,?,'draft',?,?,?)").run(c,d.slug,JSON.stringify(d),ord,t,t);
  log(u,'created '+c.slice(0,-1),label(c,d));return J(200,{ok:true,id:Number(r.lastInsertRowid)})});
 add('PUT',/^\/api\/c\/(\w+)\/(\d+)$/,(rq,c,id,body,u)=>{const r=colOk(c)&&row(c,id);if(!r)return ERR(404,'Not found');const{d,e}=checkDoc(c,body.data,r.id,false);if(Object.keys(e).length)return ERR(400,'Please fix the highlighted fields.',{errors:e});
  db.prepare('UPDATE docs SET data=?,slug=?,updated_at=? WHERE id=?').run(JSON.stringify(d),d.slug,now(),r.id);log(u,'saved draft of '+c.slice(0,-1),label(c,d));return J(200,{ok:true,doc:sumOf(c,row(c,id)),data:d})});
 add('POST',/^\/api\/c\/(\w+)\/(\d+)\/publish$/,(rq,c,id,body,u)=>colOk(c)&&row(c,id)?doPublish(c,id,u):ERR(404,'Not found'));
 add('POST',/^\/api\/c\/(\w+)\/(\d+)\/schedule$/,(rq,c,id,body,u)=>{const r=c==='articles'&&row(c,id);if(!r)return ERR(404,'Not found');const t=Date.parse(body.publishAt);if(!Number.isFinite(t)||t<=Date.now()+30000)return ERR(400,'Choose a date and time in the future.');
  const{e}=checkDoc(c,JSON.parse(r.data),r.id,true);if(Object.keys(e).length)return ERR(400,'Fix the highlighted fields before scheduling.',{errors:e});db.prepare("UPDATE docs SET status='scheduled',publish_at=?,updated_at=? WHERE id=?").run(new Date(t).toISOString(),now(),r.id);
  try{rebuild()}catch(x){return ERR(500,x.message)}log(u,'scheduled article',JSON.parse(r.data).title);return J(200,{ok:true,doc:sumOf(c,row(c,id))})});
 const setStatus=(st,verb)=>(rq,c,id,body,u)=>{const r=colOk(c)&&row(c,id);if(!r)return ERR(404,'Not found');db.prepare("UPDATE docs SET status=?,published=NULL,publish_at=NULL,updated_at=? WHERE id=?").run(st,now(),r.id);
  try{rebuild()}catch(x){return ERR(500,'Status changed, but the public site could not be rebuilt: '+x.message)}log(u,verb+' '+c.slice(0,-1),label(c,JSON.parse(r.data)));return J(200,{ok:true,doc:sumOf(c,row(c,id))})};
 add('POST',/^\/api\/c\/(\w+)\/(\d+)\/unpublish$/,setStatus('draft','unpublished'));add('POST',/^\/api\/c\/(\w+)\/(\d+)\/archive$/,setStatus('archived','archived'));
 add('DELETE',/^\/api\/c\/(\w+)\/(\d+)$/,(rq,c,id,body,u)=>{const r=colOk(c)&&row(c,id);if(!r)return ERR(404,'Not found');db.prepare('DELETE FROM docs WHERE id=?').run(r.id);try{rebuild()}catch(x){return ERR(500,'Deleted, but the public site could not be rebuilt: '+x.message)}log(u,'deleted '+c.slice(0,-1),label(c,JSON.parse(r.data)));return J(200,{ok:true})});
 add('POST',/^\/api\/c\/(\w+)\/reorder$/,(rq,c,body,u)=>{if(!colOk(c)||!Array.isArray(body.ids))return ERR(400,'Invalid request');tx(db,()=>body.ids.forEach((id,i)=>db.prepare('UPDATE docs SET ord=? WHERE collection=? AND id=?').run(i+1,c,Number(id))));try{rebuild()}catch(x){return ERR(500,x.message)}log(u,'reordered',c);return J(200,{ok:true})});
 /* ---------- inquiries */
 const STAT=['new','in_progress','responded','closed'];
 function inqWhere(p){const w=[],a=[];const q=p.get('q');if(q){w.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR subject LIKE ? OR message LIKE ?)");for(let i=0;i<5;i++)a.push('%'+q.replace(/[%_]/g,'')+'%')}if(STAT.includes(p.get('status'))){w.push('status=?');a.push(p.get('status'))}if(p.get('read')==='unread')w.push('is_read=0');if(p.get('read')==='read')w.push('is_read=1');return{sql:w.length?' WHERE '+w.join(' AND '):'',a}}
 add('GET',/^\/api\/inquiries$/,rq=>{const p=rq.url.searchParams,{sql,a}=inqWhere(p);const lim=Math.min(100,Number(p.get('limit'))||50),off=(Math.max(1,Number(p.get('page'))||1)-1)*lim;return J(200,{ok:true,total:db.prepare('SELECT COUNT(*) n FROM inquiries'+sql).get(...a).n,items:db.prepare('SELECT id,name,email,company,subject,budget,created_at,status,is_read,substr(message,1,140) preview FROM inquiries'+sql+' ORDER BY id DESC LIMIT ? OFFSET ?').all(...a,lim,off)})});
 add('GET',/^\/api\/inquiries\.csv$/,(rq,u)=>{const{sql,a}=inqWhere(rq.url.searchParams);const rows=db.prepare('SELECT * FROM inquiries'+sql+' ORDER BY id DESC').all(...a);const cell=v=>{v=String(v==null?'':v);if(/^[=+\-@\t\r]/.test(v))v="'"+v;return'"'+v.replace(/"/g,'""')+'"'};
  const head=['id','date','name','email','company','subject','budget','status','read','message','notes'];return{s:200,raw:head.join(',')+'\n'+rows.map(r=>[r.id,r.created_at,r.name,r.email,r.company,r.subject,r.budget,r.status,r.is_read?'yes':'no',r.message,r.notes].map(cell).join(',')).join('\n')+'\n',type:'text/csv; charset=utf-8',name:'inquiries-'+today()+'.csv'}});
 add('GET',/^\/api\/inquiries\/(\d+)$/,(rq,id)=>{const r=db.prepare('SELECT * FROM inquiries WHERE id=?').get(id);if(!r)return ERR(404,'Not found');if(!r.is_read){db.prepare('UPDATE inquiries SET is_read=1 WHERE id=?').run(id);r.is_read=1}return J(200,{ok:true,item:r})});
 add('PATCH',/^\/api\/inquiries\/(\d+)$/,(rq,id,body,u)=>{const r=db.prepare('SELECT * FROM inquiries WHERE id=?').get(id);if(!r)return ERR(404,'Not found');const st=body.status===undefined?r.status:body.status,rd=body.is_read===undefined?r.is_read:(body.is_read?1:0),nt=body.notes===undefined?r.notes:String(body.notes).slice(0,5000);
  if(!STAT.includes(st))return ERR(400,'Invalid status');db.prepare('UPDATE inquiries SET status=?,is_read=?,notes=? WHERE id=?').run(st,rd,nt,id);log(u,'updated inquiry',String(id));return J(200,{ok:true})});
 add('DELETE',/^\/api\/inquiries\/(\d+)$/,(rq,id,body,u)=>{const n=db.prepare('DELETE FROM inquiries WHERE id=?').run(id).changes;if(!n)return ERR(404,'Not found');log(u,'deleted inquiry',String(id));return J(200,{ok:true})});
 /* ---------- media */
 const usage=p=>db.prepare("SELECT collection,slug,data FROM docs WHERE instr(data,?)>0 OR instr(COALESCE(published,''),?)>0").all(p,p).map(r=>{const d=JSON.parse(r.data);return{type:r.collection==='single'?(r.slug.startsWith('page:')?'Page: '+(Sch.PAGE_LABELS[r.slug.slice(5)]||r.slug):Sch.SCHEMAS[r.slug].label):(r.collection==='strategies'?'Strategy':r.collection.slice(0,-1)[0].toUpperCase()+r.collection.slice(1,-1)),label:r.collection==='single'?'':d.name||d.title}});
 const kindOf=m=>m==='application/pdf'?'pdf':m&&m.startsWith('image/')?'image':'other';
 add('GET',/^\/api\/media$/,rq=>{const p=rq.url.searchParams,q=(p.get('q')||'').toLowerCase(),k=p.get('kind');let rows=db.prepare('SELECT * FROM media ORDER BY id DESC').all().map(r=>Object.assign(r,{kind:kindOf(r.mime)}));if(k)rows=rows.filter(r=>r.kind===k);if(q)rows=rows.filter(r=>(r.original+' '+r.alt+' '+r.path).toLowerCase().includes(q));return J(200,{ok:true,items:rows})});
 const save=async(rq,existing)=>{const buf=await readBody(rq.req,11e6);const s=sniff(buf);if(!s)return ERR(400,'Unsupported file. Upload PNG, JPG, WebP, GIF or PDF files.');if(buf.length>LIM[s[0]])return ERR(400,'File is too large (max '+LIM[s[0]]/1e6+' MB).');fs.mkdirSync(UP,{recursive:true});
  const name=rid(6)+'.'+s[0];fs.writeFileSync(path.join(UP,name),buf);return{name,ext:s[0],mime:s[1],size:buf.length}};
 add('POST',/^\/api\/media$/,async(rq,body,u)=>{const f=await save(rq);if(f.s)return f;const p=rq.url.searchParams,orig=String(p.get('name')||'upload.'+f.ext).replace(/[^\w.\- ]+/g,'_').slice(0,120),alt=String(p.get('alt')||'').slice(0,300);
  const r=db.prepare('INSERT INTO media(path,original,mime,size,alt,created_at) VALUES(?,?,?,?,?,?)').run('uploads/'+f.name,orig,f.mime,f.size,alt,now());log(u,'uploaded media',orig);return J(200,{ok:true,item:db.prepare('SELECT * FROM media WHERE id=?').get(r.lastInsertRowid)})},{raw:true});
 add('PUT',/^\/api\/media\/(\d+)\/file$/,async(rq,id,body,u)=>{const m=db.prepare('SELECT * FROM media WHERE id=?').get(id);if(!m)return ERR(404,'Not found');const f=await save(rq);if(f.s)return f;const np='uploads/'+f.name;
  tx(db,()=>{db.prepare("UPDATE docs SET data=replace(data,?,?),published=replace(published,?,?)").run(m.path,np,m.path,np);db.prepare('UPDATE media SET path=?,mime=?,size=?,builtin=0 WHERE id=?').run(np,f.mime,f.size,id)});
  if(m.path.startsWith('uploads/'))fs.rmSync(path.join(ROOT,m.path),{force:true});try{rebuild()}catch(x){return ERR(500,'File replaced, but the site could not be rebuilt: '+x.message)}log(u,'replaced media',m.original);return J(200,{ok:true,item:db.prepare('SELECT * FROM media WHERE id=?').get(id)})},{raw:true});
 add('PATCH',/^\/api\/media\/(\d+)$/,(rq,id,body,u)=>{if(!db.prepare('UPDATE media SET alt=? WHERE id=?').run(String(body.alt||'').slice(0,300),id).changes)return ERR(404,'Not found');log(u,'updated media alt',String(id));return J(200,{ok:true})});
 add('DELETE',/^\/api\/media\/(\d+)$/,(rq,id,body,u)=>{const m=db.prepare('SELECT * FROM media WHERE id=?').get(id);if(!m)return ERR(404,'Not found');if(m.builtin)return ERR(409,'Bundled placeholder images cannot be deleted. Upload and use your own instead.');const us=usage(m.path);if(us.length)return ERR(409,'This file is still in use. Remove it from the items below first.',{usage:us});
  db.prepare('DELETE FROM media WHERE id=?').run(id);fs.rmSync(path.join(ROOT,m.path),{force:true});log(u,'deleted media',m.original);return J(200,{ok:true})});
 add('GET',/^\/api\/media\/(\d+)\/usage$/,(rq,id)=>{const m=db.prepare('SELECT path FROM media WHERE id=?').get(id);return m?J(200,{ok:true,usage:usage(m.path)}):ERR(404,'Not found')});
 /* ---------- seo audit, backups, rebuild */
 add('GET',/^\/api\/seo\/audit$/,()=>{const items=[];const push=(type,id,name,d)=>items.push({type,id,name,title:d.seoTitle||'',desc:d.metaDescription||'',noindex:!!d.noindex});
  for(const r of db.prepare("SELECT * FROM docs WHERE collection='single' AND slug LIKE 'page:%' AND slug<>'page:services'").all())push('Page',r.slug.slice(5),Sch.PAGE_LABELS[r.slug.slice(5)],JSON.parse(r.data));
  for(const c of['articles','projects','services','strategies','servicepages'])for(const r of db.prepare('SELECT * FROM docs WHERE collection=? AND status<>\'archived\' ORDER BY ord').all(c)){const d=JSON.parse(r.data);push((c==='servicepages'?'Service page':c==='strategies'?'Strategy':c.slice(0,-1)[0].toUpperCase()+c.slice(1,-1))+(r.status==='published'?'':' (not public)'),r.id,d.name||d.title,d)}
  const cnt=(k)=>items.reduce((a,i)=>(i[k]&&(a[i[k].toLowerCase()]=(a[i[k].toLowerCase()]||0)+1),a),{});const ct=cnt('title'),cd=cnt('desc');
  for(const i of items){i.issues=[];if(!i.title)i.issues.push('Missing SEO title');else if(i.title.length>60)i.issues.push('Title over 60 characters');if(ct[i.title.toLowerCase()]>1)i.issues.push('Duplicate title');if(!i.desc)i.issues.push('Missing meta description');else if(i.desc.length<70||i.desc.length>160)i.issues.push('Description should be 70 to 160 characters');if(cd[i.desc.toLowerCase()]>1)i.issues.push('Duplicate description');if(i.noindex)i.issues.push('Set to noindex')}
  return J(200,{ok:true,items})});
 add('POST',/^\/api\/backup$/,(rq,body,u)=>{const dir=path.join(ROOT,'backups');fs.mkdirSync(dir,{recursive:true});const f='cms-'+new Date().toISOString().replace(/[:.]/g,'-')+'.db';db.exec("VACUUM INTO '"+path.join(dir,f).replace(/'/g,"''")+"'");log(u,'created backup',f);return J(200,{ok:true,file:f})});
 add('GET',/^\/api\/backups$/,()=>{const dir=path.join(ROOT,'backups');const l=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith('.db')).sort().reverse().slice(0,20).map(f=>({file:f,size:fs.statSync(path.join(dir,f)).size})):[];return J(200,{ok:true,items:l})});
 add('POST',/^\/api\/rebuild$/,(rq,body,u)=>{try{const r=rebuild();log(u,'rebuilt site','');return J(200,{ok:true,result:r})}catch(x){return ERR(500,x.message)}});
 R.doPublish=doPublish;R.log=log;R.rebuild=rebuild;return R}
module.exports={make,sniff,stable};
