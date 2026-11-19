'use strict';
const crypto=require('crypto');
const now=()=>new Date().toISOString();
const today=()=>new Date().toISOString().slice(0,10);
const rid=(n=16)=>crypto.randomBytes(n).toString('hex');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const slugify=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,100);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function readBody(req,limit){return new Promise((res,rej)=>{const ch=[];let n=0;req.on('data',c=>{n+=c.length;if(n>limit){rej(Object.assign(new Error('too_large'),{status:413}));req.destroy();return}ch.push(c)});req.on('end',()=>res(Buffer.concat(ch)));req.on('error',rej)})}
const readJson=async(req,limit=2e6)=>{const b=await readBody(req,limit);if(!b.length)return{};try{return JSON.parse(b.toString('utf8'))}catch(e){throw Object.assign(new Error('invalid_json'),{status:400})}};
module.exports={now,today,rid,sha,slugify,esc,readBody,readJson};
