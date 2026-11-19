'use strict';
/* One-time, idempotent migration that adds the Strategies section to an existing database:
   1. imports the three starter pages (published) from strategies-content.js
   2. adds "Strategies" (and "Certifications") to the main navigation, in the position requested
   It runs on server start. A marker row in the activity log makes sure it never runs twice, so anything the owner later
   deletes or renames in the admin stays deleted or renamed. */
const{now}=require('./util'),{tx}=require('./db'),{PAGES,PAGES_V2,PAGES_V3}=require('./strategies-content');
const MARK='strategies-v1',MARK2='strategies-v2',MARK3='strategies-v3',MARK4='services-v1';
const WANT=[['Home','index.html'],['About','about.html'],['Services','services.html'],['Portfolio','portfolio.html'],['Strategies','strategies.html'],['Resources','resources.html'],['Certifications','certifications.html'],['Contact','contact.html']];

function fixNav(nav){nav=Array.isArray(nav)?nav.slice():[];const has=(l,h)=>nav.some(n=>n.label===l||(h&&String(n.href||'').replace(/^\//,'')===h));
 const put=(label,href,after)=>{if(has(label,href))return;const i=nav.findIndex(n=>n.label===after);const item={label,href,visible:true,button:false};if(i>=0)nav.splice(i+1,0,item);else{const c=nav.findIndex(n=>n.label==='Contact');nav.splice(c>=0?c:nav.length,0,item)}};
 put('Strategies','strategies.html','Portfolio');put('Certifications','certifications.html','Resources');return nav}

function migrate(db){if(db.prepare('SELECT 1 FROM activity WHERE target=?').get(MARK))return false;
 if(!db.prepare("SELECT 1 FROM docs WHERE collection='single' AND slug='settings'").get())return false; /* empty database: seed() has not run yet */
 tx(db,()=>{const t=now(),have=db.prepare("SELECT slug FROM docs WHERE collection='strategies'").all().map(r=>r.slug);let ord=db.prepare("SELECT COALESCE(MAX(ord),0) n FROM docs WHERE collection='strategies'").get().n;
  const ins=db.prepare("INSERT INTO docs(collection,slug,data,published,status,ord,created_at,updated_at,published_at) VALUES('strategies',?,?,?,'published',?,?,?,?)");
  for(const pg of PAGES){if(have.includes(pg.slug))continue;const j=JSON.stringify(pg);ins.run(pg.slug,j,j,++ord,t,t,t)}
  const r=db.prepare("SELECT id,data,published FROM docs WHERE collection='single' AND slug='settings'").get(),d=JSON.parse(r.data),p=r.published?JSON.parse(r.published):null;
  d.navigation=fixNav(d.navigation);if(p)p.navigation=fixNav(p.navigation);
  db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(JSON.stringify(d),p?JSON.stringify(p):null,r.id);
  db.prepare('INSERT INTO activity(at,user,action,target) VALUES(?,?,?,?)').run(t,'system','Added the Strategies section (3 pages) and navigation links',MARK)});
 return true}

/* v2: adds the Off-Page SEO and Technical SEO pages, links them from the existing pages, and turns the "coming soon" off-page card on the GEO page into a real link.
   Existing pages are only touched where the new links are missing, so owner edits are preserved. */
const XREL=[{group:'Strategy',label:'Off-Page SEO strategy',text:'Backlinks, digital PR and brand reputation.',href:'/strategies/off-page-seo'},{group:'Strategy',label:'Technical SEO strategy',text:'Crawlability, indexation, structured data and Core Web Vitals.',href:'/strategies/technical-seo'}];
function patchExisting(j){if(!j)return j;try{const d=typeof j==='string'?JSON.parse(j):j;if(!Array.isArray(d.related))d.related=[];
  if(d.kind==='strategy')for(const x of XREL)if(!d.related.some(r=>r.href===x.href))d.related.unshift(Object.assign({},x));
  for(const b of d.blocks||[])if(b.type==='cards')for(const c of b.cards||[])if(c.soon&&/Off-Page SEO Strategy/i.test(c.title||'')){c.soon=false;c.href='/strategies/off-page-seo';c.linkLabel='Read the Off-Page SEO strategy';c.text='A dedicated page on my off-page and digital authority methodology: backlink acquisition, digital PR, opinion leaders, reputation management and Google\'s link spam policies.'}
  return JSON.stringify(d)}catch(e){return typeof j==='string'?j:JSON.stringify(j)}}
function migrate2(db){if(db.prepare('SELECT 1 FROM activity WHERE target=?').get(MARK2))return false;
 if(!db.prepare("SELECT 1 FROM docs WHERE collection='strategies'").get())return false;
 tx(db,()=>{const t=now(),have=db.prepare("SELECT slug FROM docs WHERE collection='strategies'").all().map(r=>r.slug);let ord=db.prepare("SELECT COALESCE(MAX(ord),0) n FROM docs WHERE collection='strategies'").get().n;
  const ins=db.prepare("INSERT INTO docs(collection,slug,data,published,status,ord,created_at,updated_at,published_at) VALUES('strategies',?,?,?,'published',?,?,?,?)");
  for(const pg of PAGES_V2){if(have.includes(pg.slug))continue;const j=JSON.stringify(pg);ins.run(pg.slug,j,j,++ord,t,t,t)}
  for(const r of db.prepare("SELECT id,data,published FROM docs WHERE collection='strategies' AND slug IN ('on-page-seo','geo-ai-seo')").all())
   db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(patchExisting(r.data),r.published?patchExisting(r.published):null,r.id);
  db.prepare('INSERT INTO activity(at,user,action,target) VALUES(?,?,?,?)').run(t,'system','Added the Off-Page SEO and Technical SEO strategy pages',MARK2)});
 return true}
/* v3: adds the Local SEO page and links it from the existing strategy pages (only where the link is missing). */
const LOC={group:'Strategy',label:'Local SEO strategy',text:'Location-specific pages, Google Business Profile and local authority.',href:'/strategies/local-seo'};
function patchLocal(j){if(!j)return j;try{const d=typeof j==='string'?JSON.parse(j):j;if(d.kind==='strategy'){if(!Array.isArray(d.related))d.related=[];if(!d.related.some(r=>r.href===LOC.href))d.related.unshift(Object.assign({},LOC))}return JSON.stringify(d)}catch(e){return typeof j==='string'?j:JSON.stringify(j)}}
function migrate3(db){if(db.prepare('SELECT 1 FROM activity WHERE target=?').get(MARK3))return false;
 if(!db.prepare("SELECT 1 FROM docs WHERE collection='strategies'").get())return false;
 tx(db,()=>{const t=now(),have=db.prepare("SELECT slug FROM docs WHERE collection='strategies'").all().map(r=>r.slug);let ord=db.prepare("SELECT COALESCE(MAX(ord),0) n FROM docs WHERE collection='strategies'").get().n;
  const ins=db.prepare("INSERT INTO docs(collection,slug,data,published,status,ord,created_at,updated_at,published_at) VALUES('strategies',?,?,?,'published',?,?,?,?)");
  for(const pg of PAGES_V3){if(have.includes(pg.slug))continue;const j=JSON.stringify(pg);ins.run(pg.slug,j,j,++ord,t,t,t)}
  for(const r of db.prepare("SELECT id,data,published FROM docs WHERE collection='strategies' AND slug!='local-seo'").all())
   db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(patchLocal(r.data),r.published?patchLocal(r.published):null,r.id);
  db.prepare('INSERT INTO activity(at,user,action,target) VALUES(?,?,?,?)').run(t,'system','Added the Local SEO strategy page',MARK3)});
 return true}
/* v4: adds the Services overview (/services) and eight dedicated service pages, and points the "Services" navigation link at /services.
   Service pages live in their own "servicepages" collection and use the same page engine as the strategies (the section is set from the collection). */
function migrate4(db){if(db.prepare('SELECT 1 FROM activity WHERE target=?').get(MARK4))return false;
 if(!db.prepare("SELECT 1 FROM docs WHERE collection='single' AND slug='settings'").get())return false;
 const{SERVICE_PAGES}=require('./strategies-content-services');
 tx(db,()=>{const t=now(),have=db.prepare("SELECT slug FROM docs WHERE collection='servicepages'").all().map(r=>r.slug);let ord=db.prepare("SELECT COALESCE(MAX(ord),0) n FROM docs WHERE collection='servicepages'").get().n;
  const ins=db.prepare("INSERT INTO docs(collection,slug,data,published,status,ord,created_at,updated_at,published_at) VALUES('servicepages',?,?,?,'published',?,?,?,?)");
  for(const pg of SERVICE_PAGES){if(have.includes(pg.slug))continue;const j=JSON.stringify(pg);ins.run(pg.slug,j,j,++ord,t,t,t)}
  const r=db.prepare("SELECT id,data,published FROM docs WHERE collection='single' AND slug='settings'").get(),fix=j=>{if(!j)return j;const o=JSON.parse(j);for(const n of o.navigation||[])if(n.label==='Services'&&/^\/?(index\.html)?#services$/.test(n.href||''))n.href='services.html';return JSON.stringify(o)};
  db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(fix(r.data),fix(r.published),r.id);
  db.prepare('INSERT INTO activity(at,user,action,target) VALUES(?,?,?,?)').run(t,'system','Added the Services overview and eight service pages',MARK4)});
 return true}
function migrateAll(db){const a=migrate(db),b=migrate2(db),c=migrate3(db),d=migrate4(db),e=migrate5(db);return a||b||c||d||e}
function migrate5(db){const M='strategies-v5';if(db.prepare('SELECT 1 FROM activity WHERE target=?').get(M))return false;
 const strip=j=>{if(!j)return j;const o=JSON.parse(j);if(!Array.isArray(o.blocks))return j;const a=o.blocks.findIndex(b=>b.type==='heading'&&b.id==='approach'&&/My Approach to SEO/.test(b.text||b.title||''));if(a<0)return j;o.blocks.splice(a,o.blocks[a+1]&&o.blocks[a+1].type==='cards'?2:1);return JSON.stringify(o)};
 for(const r of db.prepare("SELECT * FROM docs WHERE collection='strategies' AND slug='overview'").all())db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(strip(r.data),strip(r.published),r.id);
 db.prepare('INSERT INTO activity(at,user,action,target) VALUES(?,?,?,?)').run(new Date().toISOString(),'system','Removed the "My Approach to SEO" block from the Strategies overview',M);return true}
module.exports={migrate:migrateAll,migrate1:migrate,migrate2,migrate3,migrate4,fixNav,WANT,MARK,MARK2};
