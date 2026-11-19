'use strict';
/* Applies the case-study content (data/case-studies.json) to the five featured projects. Safe to run repeatedly: it never overwrites a case study that already has content. */
const fs=require('fs'),path=require('path'),{now}=require('./util');
const CS=JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','case-studies.json'),'utf8'));
const FIX={'vpnranks':{domainRating:'63',peakTraffic:'200K+',salesGrowth:'10X year-over-year affiliate sales growth (2023 vs. 2022)',achievements:[]},'all-about-ai':{domainRating:'74',peakTraffic:'140K+',salesGrowth:'',achievements:['Editorial backlink from Forbes']},'medical-lien-management':{domainRating:'25',peakTraffic:'',salesGrowth:'',achievements:[]},'greensense-billing':{domainRating:'13',peakTraffic:'',salesGrowth:'',achievements:[]},'virtual-mojoe':{domainRating:'12',peakTraffic:'',salesGrowth:'',achievements:[]}};
const OLD={'virtual-mojoe':'virtualmojoe'};
function apply(db,force){let n=0;for(const[slug,c]of Object.entries(CS)){const r=db.prepare("SELECT * FROM docs WHERE collection='projects' AND (slug=? OR slug=?)").get(slug,OLD[slug]||slug);if(!r)continue;const d=JSON.parse(r.data);if(d.csTitle&&!force)continue;
  Object.assign(d,c,FIX[slug],{csEnabled:true,slug,name:c.name,url:c.url,industry:c.industry});delete d.stage&&0;d.stage=c.stage;
  const j=JSON.stringify(d);let pub=r.published;if(r.status==='published'){const p=r.published?JSON.parse(r.published):{};Object.assign(p,d);pub=JSON.stringify(p)}
  db.prepare('UPDATE docs SET slug=?,data=?,published=?,updated_at=? WHERE id=?').run(slug,j,pub,now(),r.id);n++}return n}
module.exports={apply};
