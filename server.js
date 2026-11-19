'use strict';
/* Website + CMS server (Node 22.13+, no npm packages). Run: node server.js */
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=__dirname;
if(fs.existsSync(path.join(ROOT,'.env')))fs.readFileSync(path.join(ROOT,'.env'),'utf8').split(/\r?\n/).forEach(l=>{const m=l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);if(m&&!l.trim().startsWith('#')&&!(m[1] in process.env))process.env[m[1]]=m[2].replace(/\s+#.*$/,'').replace(/^["']|["']$/g,'')});
const{open}=require('./cms/db'),{seed,ensureAdmin}=require('./cms/seed'),{createApp}=require('./cms/app'),pub=require('./cms/publish');
const db=open(process.env.CMS_DB||path.join(ROOT,'data','cms.db'));
const seeded=seed(db),admin=ensureAdmin(db,process.env);
const certMigrated=require('./cms/migrate').run(db);
const migrated=require('./cms/strategies-seed').migrate(db)||certMigrated>0;
if(admin&&admin.generated)console.log('\n[admin] First-run admin account created.\n        Email:    '+admin.email+'\n        Password: '+admin.password+'\n        You must change the password at first login.\n');
if(seeded||migrated||process.env.BUILD_ON_START!=='false')pub.buildSite(db);
const app=createApp(db,process.env);app.runScheduled();setInterval(()=>{try{app.runScheduled()}catch(e){console.error('scheduler:',e.message)}},Number(process.env.SCHEDULER_INTERVAL_MS)||60000).unref();
const T={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.json':'application/json','.xml':'application/xml','.txt':'text/plain','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
const PUBLIC=/^\/(css|js|assets|resources|portfolio|strategies|services)\/[\w.\-\/]+$|^\/[\w-]+\.(html|xml|txt)$/;
const server=http.createServer(async(req,res)=>{
 if(await app.handle(req,res)!==false)return;
 let p;try{p=decodeURIComponent(new URL(req.url,'http://x').pathname)}catch(e){res.writeHead(400);return res.end('Bad request')}
 if(p.length>1&&p.endsWith('/'))p=p.slice(0,-1);
 if(p==='/')p='/index.html';else if(!path.extname(p)&&fs.existsSync(path.join(ROOT,p+'.html')))p+='.html';
 const f=path.normalize(path.join(ROOT,p));
 if(!f.startsWith(ROOT)||p.includes('..')||!PUBLIC.test(p)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found')}
 res.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});fs.createReadStream(f).pipe(res)});
server.listen(process.env.PORT||3000,()=>console.log('Website: http://localhost:'+(process.env.PORT||3000)+'\nAdmin:   http://localhost:'+(process.env.PORT||3000)+'/admin'));
module.exports={server,db};
