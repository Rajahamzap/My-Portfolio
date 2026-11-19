'use strict';
/* Vercel-style serverless route: POST /api/contact. Set the environment variables listed in .env.example in the hosting dashboard. */
const{handleContact}=require('./_lib/contact-handler');
module.exports=async(req,res)=>{
 let body=req.body;if(typeof body==='string'){try{body=JSON.parse(body)}catch(e){body=null}}
 const ip=String(req.headers['x-forwarded-for']||'').split(',')[0].trim()||(req.socket&&req.socket.remoteAddress)||'';
 const r=await handleContact({method:req.method,headers:req.headers,body,ip,env:process.env,fetchImpl:fetch});
 res.setHeader('Cache-Control','no-store');res.status(r.status).json(r.json)};
