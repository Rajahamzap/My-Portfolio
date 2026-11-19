'use strict';
/* One-time data migrations, tracked in the meta table so they never run twice. */
const{now}=require('./util');
const CERTS=[['Social Media Marketing Crash Course','','Professional training covering social media marketing fundamentals and strategies.','digital-marketing','Digital Marketing'],
['Content Marketing Essentials for SEO and AI Search','','Training focused on content marketing principles and optimization for traditional and AI-powered search experiences.','content','Content Marketing & AI Search'],
['On-Page SEO and AI Search Essentials','','Training covering on-page SEO fundamentals and content optimization for evolving search experiences.','on-page','On-Page SEO'],
['Technical SEO and AI Search Essentials','','Training focused on technical SEO foundations and search accessibility in AI-powered search environments.','technical-seo','Technical SEO'],
['AI Visibility Essentials','','Training focused on understanding and improving brand visibility across AI-powered search experiences.','geo-ai','GEO & AI Search'],
['Local SEO Essentials','','Training covering local search optimization and strategies for improving local business visibility.','local','Local SEO'],
['Off-Page SEO and AI Search Essentials','','Training focused on authority building, backlink strategies, and off-page optimization for modern search.','off-page','Off-Page SEO & AI Search'],
['Mastering Digital PR with Brian Dean','Brian Dean','Professional training covering digital PR strategies and authority-building techniques.','digital-pr','Digital PR & Link Building']];
const TOPICS=[['gear','Technical SEO and website performance'],['net','Semantic SEO and entity optimization'],['ai','Generative Engine Optimization (GEO)'],['spark','Answer Engine Optimization (AEO)'],['target','AI search visibility and LLM citations'],['doc','Content strategy and topical authority'],['link','Digital PR and link building'],['pin','Local and multi-location SEO']];
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
function certifications(db){const t=now(),D=require('./template-defaults.json').certifications,{SECTIONS}=require('./schemas');
 const ins=db.prepare('INSERT INTO docs(collection,slug,data,published,status,ord,created_at,updated_at,published_at) VALUES(?,?,?,?,?,?,?,?,?)');
 CERTS.forEach((c,i)=>{const d={title:c[0],slug:slug(c[0]),issuer:'Semrush',instructor:c[1],description:c[2],category:c[3],categoryLabel:c[4],featured:false,image:'',imageAlt:'',completionDate:'',credentialId:'',verifyUrl:''};const j=JSON.stringify(d);ins.run('certifications',d.slug,j,j,'published',i+1,t,t,t)});
 const page=Object.assign({},D,{topics:TOPICS.map(x=>({icon:x[0],t:x[1]})),seoTitle:'SEO Certifications & Professional Training | Raja Hamza Pervaiz',metaDescription:'Explore the SEO, Technical SEO, AI Search, Content Marketing, Local SEO, and Digital PR certifications earned by Raja Hamza Pervaiz.',canonical:'',noindex:false,nofollow:false,ogTitle:'',ogDescription:'',ogImage:'',sections:SECTIONS.certifications.map(s=>({key:s[0],enabled:true}))});const pj=JSON.stringify(page);
 ins.run('single','page:certifications',pj,pj,'published',0,t,t,t);
 const st=db.prepare("SELECT * FROM docs WHERE collection='single' AND slug='settings'").get();if(st){const fix=j=>{if(!j)return j;const o=JSON.parse(j);const ex=(o.navigation||[]).find(n=>n.label==='Certifications'&&n.href!=='certifications.html');if(ex)ex.href='certifications.html';if(!(o.navigation||[]).some(n=>n.href==='certifications.html')){const i=o.navigation.findIndex(n=>n.button);const item={label:'Certifications',href:'certifications.html',visible:true,button:false};if(i<0)o.navigation.push(item);else o.navigation.splice(i,0,item)}return JSON.stringify(o)};db.prepare('UPDATE docs SET data=?,published=? WHERE id=?').run(fix(st.data),fix(st.published),st.id)}}

/* Site edits requested on 2026-11-18: home buttons go to the portfolio, six portfolio cards removed (archived, so they can be restored in the admin),
   professional experience replaced, contact email replaced everywhere. */
const EMAIL='rajahamza.parvaiz@gmail.com',OLD_EMAILS=['hello@yourdomain.com'];
const EXPERIENCE=[
 {when:'Aug 2024 – Present',role:'Freelancer (SEO & Web Development)',org:'Professionals Techs',d:'Worked independently as a freelancer in partnership with a friend, focusing on generating web development projects. Managed websites with a strong focus on optimizing performance and enhancing user engagement. Wrote technical content covering website features, SEO implementation, and user guides, effectively translating complex development concepts into clear, accessible information for non-technical clients.'},
 {when:'Jan 2024 – Aug 2024',role:'Senior SEO Specialist',org:'Gaditek',d:'Led SEO strategies to improve search rankings by analyzing performance data and optimizing content. Analyzed our content strategy after it was impacted by Google\'s core update, identified key flaws in website structure and content quality, and reported findings to management. Aligned the revised strategy with Google\'s latest guidelines by enhancing E-E-A-T signals. Also managed social media to support E-E-A-T and implemented Facebook SEO strategies to boost engagement and visibility.'},
 {when:'May 2023 – Dec 2023',role:'SEO Executive',org:'Gaditek',d:'Conducted keyword research and implemented SEO strategies to improve website visibility. Monitored website traffic, optimized content for better performance and engagement, which resulted in increased sales. Successfully managed my team, and my contributions were acknowledged by leadership, leading to a promotion.'},
 {when:'Jan 2023 – Apr 2023',role:'SEO Intern',org:'Gaditek',d:'Assisted in SEO audits, keyword research, and on-page optimization to improve website rankings. Gained experience in link building and off-page strategies to boost traffic and enhance search engine visibility.'}];
const REMOVE=['screenbinge','streamingrant','crazystreamers','technical-seo','semantic-seo','geo-aeo'];
function swapEmail(j){let s=typeof j==='string'?j:JSON.stringify(j);for(const e of OLD_EMAILS)s=s.split(e).join(EMAIL);return s}
function siteEdits(db){const t=now(),upd=db.prepare('UPDATE docs SET data=?,published=?,updated_at=? WHERE id=?');
 const patch=(row,fn)=>{const f=j=>{if(!j)return j;const o=JSON.parse(j);fn(o);return swapEmail(JSON.stringify(o))};upd.run(f(row.data),f(row.published),t,row.id)};
 for(const r of db.prepare("SELECT * FROM docs WHERE collection='single'").all()){
  if(r.slug==='page:home')patch(r,o=>{if(o['hero.cta1Href']==='#projects')o['hero.cta1Href']='portfolio.html';if(o['cta.btn2Href']==='#projects')o['cta.btn2Href']='portfolio.html'});
  else if(r.slug==='profile')patch(r,o=>{o.timeline=EXPERIENCE.map(x=>Object.assign({},x));o.email=EMAIL});
  else patch(r,()=>{})}
 for(const r of db.prepare("SELECT * FROM docs WHERE collection='projects'").all()){
  if(REMOVE.includes(r.slug)){db.prepare("UPDATE docs SET status='archived',updated_at=? WHERE id=?").run(t,r.id);continue}
  patch(r,()=>{})}
 for(const r of db.prepare("SELECT * FROM docs WHERE collection NOT IN ('single','projects')").all())patch(r,()=>{})}
const TESTI=[{n:'Saleem Ahrar',r:'COO, Webaffinity / Wellows',q:"Placeholder: replace this with Saleem Ahrar's own words about working with Raja Hamza.",s:5},{n:'Aneeq Sarwar',r:'CRO, Appedology',q:"Placeholder: replace this with Aneeq Sarwar's own words about working with Raja Hamza.",s:5}];
function homeEdits(db){const t=now(),upd=db.prepare('UPDATE docs SET data=?,published=?,updated_at=? WHERE id=?');
 const go=(r,fn)=>{const f=j=>{if(!j)return j;const o=JSON.parse(j);fn(o);return JSON.stringify(o)};upd.run(f(r.data),f(r.published),t,r.id)};
 for(const r of db.prepare("SELECT * FROM docs WHERE collection='single'").all()){
  if(r.slug==='page:home')go(r,o=>{if(Array.isArray(o.sections)&&!o.sections.some(s=>s.key==='strategies')){const i=o.sections.findIndex(s=>s.key==='services');o.sections.splice(i<0?o.sections.length:i+1,0,{key:'strategies',enabled:true})}});
  else if(r.slug==='profile')go(r,o=>{const cur=o.testimonials;if(!Array.isArray(cur)||!cur.length||cur.every(x=>/^Sample text/.test(x.q||'')))o.testimonials=TESTI.map(x=>Object.assign({},x))});
  else if(r.slug==='page:certifications')go(r,o=>{if(Array.isArray(o.sections))o.sections=o.sections.filter(s=>s.key!=='overview')})}}
function photoEdits(db){const t=now(),upd=db.prepare('UPDATE docs SET data=?,published=?,updated_at=? WHERE id=?');
 const go=(r,fn)=>{const f=j=>{if(!j)return j;const o=JSON.parse(j);fn(o);return JSON.stringify(o)};upd.run(f(r.data),f(r.published),t,r.id)};
 for(const r of db.prepare("SELECT * FROM docs WHERE collection='single'").all()){
  if(r.slug==='page:home')go(r,o=>{if(Array.isArray(o.sections))o.sections=o.sections.filter(s=>s.key!=='testimonials');if(/placeholder/.test(o.heroImage||''))o.heroImage=''});
  else if(r.slug==='page:about')go(r,o=>{if(/placeholder/.test(o.heroImage||''))o.heroImage='';if(/placeholder photo/.test(o.imageAlt||''))o.imageAlt='Portrait of Raja Hamza Pervaiz'});
  else if(r.slug==='profile')go(r,o=>{delete o.testimonials;if(!o.photo||/placeholder/.test(o.photo))o.photo='assets/profile.jpg';if(/placeholder photo/.test(o.photoAlt||''))o.photoAlt='Portrait of Raja Hamza Pervaiz'})}}
const STEPS=[['certifications_v1',certifications],['site_edits_20261118',siteEdits],['home_edits_20261119',homeEdits],['photo_edits_20261119',photoEdits]];
function run(db){const done=k=>db.prepare('SELECT 1 FROM meta WHERE key=?').get(k);let n=0;for(const[k,fn]of STEPS){if(done(k))continue;fn(db);db.prepare('INSERT INTO meta(key,value) VALUES(?,?)').run(k,now());n++}return n}
module.exports={run,EXPERIENCE,EMAIL};
