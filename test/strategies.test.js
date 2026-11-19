'use strict';
/* End-to-end test of the Strategies section: starts the real server on a temp copy and exercises pages, navigation, sitemap and the admin API. */
const fs=require('fs'),path=require('path'),os=require('os'),{spawn}=require('child_process'),assert=require('assert');
const SRC=path.join(__dirname,'..'),TMP=fs.mkdtempSync(path.join(os.tmpdir(),'str-'));
fs.cpSync(SRC,TMP,{recursive:true,filter:s=>!/[\/\\](backups|uploads|node_modules)([\/\\]|$)/.test(s)&&!/cms\.db/.test(s)});
const PORT=3800+Math.floor(Math.random()*150),B='http://localhost:'+PORT;let out='';
const srv=spawn('node',['server.js'],{cwd:TMP,env:Object.assign({},process.env,{PORT,CMS_DB:path.join(TMP,'data','s.db'),ADMIN_EMAIL:'owner@test.com',ADMIN_PASSWORD:'Initial-Pass-2026',RESEND_API_KEY:'',CONTACT_TO_EMAIL:''})});srv.stdout.on('data',d=>out+=d);srv.stderr.on('data',d=>out+=d);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));let cookie='',csrf='',n=0;const ok=(c,m)=>{assert(c,m);n++;console.log('  ok -',m)};
async function call(m,p,body){const h={};if(cookie)h.cookie=cookie;if(csrf&&m!=='GET')h['x-csrf-token']=csrf;let b;if(body!==undefined){b=JSON.stringify(body);h['content-type']='application/json'}const r=await fetch(B+p,{method:m,headers:h,body:b,redirect:'manual'});const sc=r.headers.get('set-cookie');if(sc)cookie=sc.split(';')[0];const t=await r.text();let j;try{j=JSON.parse(t)}catch(e){}return{s:r.status,j,t}}
const pub=async p=>{const r=await fetch(B+p);return{s:r.status,t:await r.text()}};
(async()=>{try{for(let i=0;i<60&&!out.includes('Website:');i++)await sleep(150);assert(out.includes('Website:'),'server started: '+out);
 console.log('PUBLIC PAGES');
 for(const u of['/strategies','/strategies/on-page-seo','/strategies/geo-ai-seo']){const r=await pub(u);ok(r.s===200,u+' loads');ok(/<title>[^<]+\| Raja Hamza Pervaiz<\/title>/.test(r.t)&&/rel="canonical"/.test(r.t)&&/og:title/.test(r.t)&&/BreadcrumbList/.test(r.t),u+' has title, canonical, Open Graph and breadcrumb schema');ok(/Strategies<\/a>/.test(r.t)&&/Certifications/.test(r.t),u+' shows the new navigation')}
 let r=await pub('/strategies');ok(/href="strategies\/on-page-seo\.html"/.test(r.t)&&/href="strategies\/geo-ai-seo\.html"/.test(r.t),'overview links to both strategy pages');
 r=await pub('/strategies/on-page-seo');ok(/href="\.\.\/strategies\/geo-ai-seo\.html"/.test(r.t),'on-page page links to GEO page');ok(/class="sx-toc"/.test(r.t)&&/id="workflow"/.test(r.t),'on-page page has a table of contents and anchors');
 const g=await pub('/strategies/geo-ai-seo');ok(/href="\.\.\/strategies\/on-page-seo\.html"/.test(g.t),'GEO page links back to on-page methodology');ok(/sx-ph/.test(g.t)&&!/<img[^>]+screenshot/i.test(g.t),'GEO page shows screenshot placeholders (no fake screenshots)');
 for(const t of[r.t,g.t])ok(/portfolio\/medical-lien-management\.html|portfolio\/vpnranks\.html/.test(t)&&/contact\.html/.test(t)&&/resources\.html/.test(t),'strategy page links to case studies, resources and contact');
 ok(!/guarantee/i.test(g.t.replace(/does not guarantee|not guaranteed|not a guarantee|No guarantees/gi,'')),'no ranking or citation guarantees are made');
 r=await pub('/sitemap.xml');ok(/\/strategies</.test(r.t)&&/\/strategies\/on-page-seo</.test(r.t)&&/\/strategies\/geo-ai-seo</.test(r.t),'sitemap includes the overview and first three pages');
 for(const f of['/','/about','/portfolio','/resources','/contact','/portfolio/vpnranks']){r=await pub(f);ok(r.s===200&&/strategies\.html/.test(r.t),f+' still loads and has the Strategies nav link')}

 console.log('OFF-PAGE & TECHNICAL PAGES');
 {const FOUR=['on-page-seo','geo-ai-seo','off-page-seo','technical-seo','local-seo'];const ov2=await pub('/strategies');
  ok(FOUR.every(sl=>ov2.t.includes('href="strategies/'+sl+'.html"')),'overview links to all five strategy pages');
  ok(!/Coming soon/.test(ov2.t),'overview has no "coming soon" card left');
  for(const sl of['off-page-seo','technical-seo','local-seo']){const q=await pub('/strategies/'+sl);ok(q.s===200,'/strategies/'+sl+' loads');
   ok((q.t.match(/<h1[ >]/g)||[]).length===1&&new RegExp('rel="canonical" href="[^"]*/strategies/'+sl+'"').test(q.t)&&/BreadcrumbList/.test(q.t),sl+': one H1, canonical, breadcrumb schema');
   ok(FOUR.filter(x=>x!==sl).every(x=>q.t.includes('href="../strategies/'+x+'.html"')),sl+': links to the other three strategy pages');
   ok(/class="sx-toc"/.test(q.t)&&/contact\.html/.test(q.t)&&/id="my-(role|approach)"/.test(q.t)&&(sl==="local-seo"||/id="results"/.test(q.t)),sl+': has TOC, results, My Role and contact CTA');
   const ids=[...q.t.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);ok(ids.every(i=>q.t.includes('id="'+i+'"')),sl+': every in-page anchor resolves');
   ok(!/guarantee/i.test(q.t.replace(/does not guarantee|not guaranteed|not a guarantee|no guarantee|never suggest guaranteed|never guaranteed|never guarantee|guaranteed inclusion|guarantee that/gi,'')),sl+': makes no guarantees')}
  const off=(await pub('/strategies/off-page-seo')).t,tech=(await pub('/strategies/technical-seo')).t;
  ok(/Domain Rating \(DR\) 63/.test(off)&&/DR\) 74/.test(off)&&/10×/.test(off)&&/DR\) 25/.test(off)&&/DR\) 13/.test(off)&&/DR\) 12/.test(off),'off-page results use the supplied figures');
  ok(/not a Google ranking metric/.test(off)&&/violate Google/.test(off)&&/rel=&quot;sponsored&quot;|rel="sponsored"/.test(off),'off-page: DR caveat, paid-link policy warning and sponsored qualifier');
  ok(/200,000\+/.test(tech)&&/Domain Rating 63/.test(tech)&&/not be attributed exclusively/.test(tech),'technical results use the supplied figures and do not over-attribute');
  ok(/id="lcp"/.test(tech)&&/id="inp"/.test(tech)&&/id="cls"/.test(tech)&&/class="sx-code/.test(tech),'technical page has LCP, INP and CLS sections and code snippets');
  ok(!/<script>alert/.test(tech)&&/&lt;link rel=&quot;preload&quot;/.test(tech),'code snippets are escaped, not executed');
  const g2=await pub('/strategies/geo-ai-seo');ok(/href="\.\.\/strategies\/off-page-seo\.html"/.test(g2.t)&&!/Coming soon/.test(g2.t),'GEO page off-page card now links to the real page');
  {const lc=(await pub('/strategies/local-seo')).t;
   ok(['location-structure','location-content','duplicate-location-content','commercial-local-blogs','keyword-cannibalization','local-citations','google-business-profile','local-keyword-research','local-internal-linking','local-schema-technical','performance-measurement','my-approach'].every(i=>lc.includes('id="'+i+'"')),'local SEO page has all eleven sections');
   ok(/Structured versus unstructured citations/.test(lc)&&/Transactional service page versus commercial-investigation blog/.test(lc)&&/State, province or region/.test(lc)&&/Google Business Profile optimization checklist/.test(lc),'local SEO page has the hierarchy, citation, intent and GBP checklist visuals');
   ok(/hypothetical example/.test(lc)&&!/\b\d+%/.test(lc.replace(/<[^>]*>/g,'')),'local SEO page uses no invented percentages and labels the dental example as hypothetical')}
  const sm=await pub('/sitemap.xml');ok(FOUR.every(sl=>sm.t.includes('/strategies/'+sl+'<')),'sitemap includes all five strategy pages')}

 console.log('SERVICES SECTION & SITE EDITS');
 {const SL=['technical-seo','on-page-seo','off-page-seo','local-seo','semantic-seo-entity-optimization','geo-ai-search-optimization','seo-audits-competitor-analysis','keyword-research-content-strategy'];
  const sv=await pub('/services');ok(sv.s===200&&(sv.t.match(/<h1[ >]/g)||[]).length===1,'/services loads with one H1');
  ok(SL.every(x=>sv.t.includes('href="services/'+x+'.html"')),'every service card links to its dedicated page');
  ok((await pub('/services/')).s===200,'/services/ (trailing slash) loads');
  for(const x of SL){const q=await pub('/services/'+x);ok(q.s===200&&new RegExp('rel="canonical" href="[^"]*/services/'+x+'"').test(q.t)&&/"@type":"Service"/.test(q.t)&&/BreadcrumbList/.test(q.t),'/services/'+x+': loads, canonical, Service and breadcrumb schema')}
  ok(/Research &amp; Discovery/.test(sv.t)&&/Monitoring &amp; Improvement/.test(sv.t)&&/class="sx-proc"/.test(sv.t),'services: five-stage process');
  ok(['SaaS and Technology','Artificial Intelligence','VPN and Cybersecurity','Healthcare and Medical Services','Medical Lead Generation','Affiliate and Content Websites','Service-Based Businesses'].every(x=>sv.t.includes(x)),'services: all seven industries');
  ok(/200K\+ peak monthly organic visits/.test(sv.t)&&/140K\+ peak monthly organic visits/.test(sv.t)&&/Forbes/.test(sv.t)&&/portfolio\/vpnranks\.html/.test(sv.t)&&/portfolio\/all-about-ai\.html/.test(sv.t),'services: verified results link to their case studies');
  ok((sv.t.match(/<details>/g)||[]).length===8&&/Do you work with international businesses/.test(sv.t),'services: eight FAQ items');
  ok(['Google Search Console','Google Analytics 4','Ahrefs','Semrush','Screaming Frog','Google Tag Manager','Looker Studio','WordPress'].every(x=>sv.t.includes(x)),'services: all eight tools');
  ok(/linkedin\.com\/in\//.test(sv.t)&&/contact\.html/.test(sv.t),'services: closing CTA links to Contact and LinkedIn');
  const smx=(await pub('/sitemap.xml')).t;ok(/\/services</.test(smx)&&SL.every(x=>smx.includes('/services/'+x+'<')),'sitemap includes /services and all eight service pages');
  const home=await pub('/');ok(/href="portfolio\.html"[^>]*>Explore My Work/.test(home.t)&&/href="portfolio\.html"[^>]*>View My Projects/.test(home.t),'home: Explore My Work and View My Projects go to the portfolio');
  const pf=await pub('/portfolio');ok(!/ScreenBinge|StreamingRant|CrazyStreamers/i.test(pf.t)&&!/>Technical SEO<|>Semantic SEO|>GEO/.test(pf.t.replace(/<nav[\s\S]*?<\/nav>/,'')),'portfolio: the six cards are removed');
  const ab=await pub('/js/cms-overrides.js');ok(/Professionals Techs/.test(ab.t)&&/Senior SEO Specialist/.test(ab.t)&&/SEO Intern/.test(ab.t)&&!/Appedology|Webaffinity/i.test(ab.t),'about: professional experience updated');
  ok(!/hello@yourdomain\.com/.test(home.t+ab.t+(await pub('/contact')).t)&&/rajahamza\.parvaiz@gmail\.com/.test((await pub('/contact')).t),'contact email replaced');
  ok(!/<a[^>]*href="index\.html#services"[^>]*>Services<\/a>/.test(sv.t),'nav Services link points to /services')}
 console.log('ADMIN API');
 r=await call('GET','/api/c/strategies');ok(r.s===401,'strategies API requires login');
 r=await call('POST','/api/auth/login',{email:'owner@test.com',password:'Initial-Pass-2026'});csrf=r.j.csrf;await call('POST','/api/auth/change-password',{current:'Initial-Pass-2026',password:'New-Secure-Pass-77'});
 r=await call('GET','/api/meta');ok(r.j.blocks&&r.j.blocks.table&&r.j.collections.strategies,'meta exposes block types and the strategies collection');
 r=await call('GET','/api/c/strategies');ok(r.j.items.length===6&&r.j.items.every(i=>i.status==='published'),'six published strategy pages exist (overview + five strategies)');
 const on=r.j.items.find(i=>i.slug==='on-page-seo'),ov=r.j.items.find(i=>i.slug==='overview');
 r=await call('GET','/api/c/strategies/'+on.id);const d=r.j.doc.data;ok(d.blocks.length>50,'page content is stored as editable blocks');
 d.blocks[0].text='Edited heading';d.blocks.push({type:'table',caption:'T',columns:['A','B'],rows:['1 | 2']},{type:'list',style:'bullets',items:['x']});
 r=await call('PUT','/api/c/strategies/'+on.id,{data:d});ok(r.s===200,'draft saved');
 let x=await pub('/strategies/on-page-seo');ok(!/Edited heading/.test(x.t),'draft changes are not public');
 r=await call('GET','/preview/strategy/'+on.id);ok(r.s===200&&/Edited heading/.test(r.t)&&/noindex/.test(r.t),'preview shows the draft with noindex');
 r=await call('POST','/api/c/strategies/'+on.id+'/publish');ok(r.s===200,'published');x=await pub('/strategies/on-page-seo');ok(/Edited heading/.test(x.t)&&/<table>/.test(x.t),'published changes (heading, table) are public');
 d.blocks.push({type:'nope'});r=await call('PUT','/api/c/strategies/'+on.id,{data:d});ok(r.s===400&&Object.keys(r.j.errors).some(k=>/^blocks\./.test(k)),'unknown block type is rejected');
 d.blocks.pop();d.blocks.push({type:'text',text:'<script>alert(1)</script> [x](javascript:alert(1))'});await call('PUT','/api/c/strategies/'+on.id,{data:d});await call('POST','/api/c/strategies/'+on.id+'/publish');x=await pub('/strategies/on-page-seo');ok(!/<script>alert/.test(x.t)&&!/href="javascript:/.test(x.t),'script and javascript: links are neutralised');
 r=await call('POST','/api/c/strategies',{data:{kind:'strategy',slug:'demo-strategy',title:'Demo Strategy',heroHeading:'Off-Page',blocks:[{type:'heading',level:'2',text:'Intro',toc:true},{type:'text',text:'Hello'}],cardTitle:'Off-Page card',cardText:'About off-page.',cardCta:'Open'}});ok(r.s===200,'new strategy page created');const nid=r.j.id;
 r=await call('POST','/api/c/strategies/'+nid+'/publish');ok(r.s===200,'new page published');x=await pub('/strategies/demo-strategy');ok(x.s===200,'new page is live at /strategies/demo-strategy');x=await pub('/strategies');ok(/Off-Page card/.test(x.t),'new page appears on the overview automatically');x=await pub('/sitemap.xml');ok(/off-page-seo/.test(x.t),'new page is in the sitemap');
 r=await call('POST','/api/c/strategies',{data:{kind:'overview',title:'Second overview',heroHeading:'x',blocks:[]}});ok(r.s===400,'a second overview page is rejected');
 r=await call('POST','/api/c/strategies/'+nid+'/unpublish');x=await pub('/strategies/demo-strategy');ok(x.s===404,'unpublished page is removed from the site');x=await pub('/strategies');ok(!/Off-Page card/.test(x.t),'and from the overview');
 r=await call('POST','/api/c/strategies/reorder',{ids:[ov.id,nid,on.id]});ok(r.s===200,'reorder works');
 r=await call('DELETE','/api/c/strategies/'+nid);ok(r.s===200,'page deleted');
 r=await pub('/');ok(/id="strategies-grid"/.test(r.t)&&/href="strategies\/on-page-seo\.html"/.test(r.t)&&/href="strategies\/local-seo\.html"/.test(r.t)&&/href="strategies\.html"/.test(r.t),'home: Strategies section with cards and overview button');
 ok(/href="services\.html"[^>]*>Explore My SEO Services/.test(r.t),'home: button after What I Bring to the Table leads to services');
 ok(r.t.indexOf('id="strategies"')>r.t.indexOf('id="services"')&&r.t.indexOf('id="strategies"')<r.t.indexOf('id="projects"'),'home: Strategies section sits after services');
 r=await pub('/');ok(!/What People Say/.test(r.t)&&!/id="track"/.test(r.t),'home: What People Say section removed');
 r=await pub('/strategies');ok(!/My Approach to SEO/.test(r.t)&&!/Five principles shape/.test(r.t),'strategies overview: philosophy section removed');
 r=await call('GET','/api/seo/audit');ok(r.j.items.some(i=>/Strategy/.test(i.type)),'SEO audit includes strategy pages');
 console.log('\n'+n+' strategies checks passed');srv.kill();process.exit(0)}catch(e){console.error('FAILED:',e.message);console.error(out.slice(-800));srv.kill();process.exit(1)}})();
