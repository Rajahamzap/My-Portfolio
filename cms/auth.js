'use strict';
const crypto=require('crypto'),{now,rid,sha}=require('./util');
const N=16384;
function hashPw(pw){const salt=crypto.randomBytes(16);return`scrypt$${N}$${salt.toString('hex')}$${crypto.scryptSync(pw,salt,64,{N}).toString('hex')}`}
function verifyPw(pw,stored){try{const[a,n,s,h]=String(stored).split('$');if(a!=='scrypt')return false;const x=crypto.scryptSync(pw,Buffer.from(s,'hex'),64,{N:+n});const y=Buffer.from(h,'hex');return x.length===y.length&&crypto.timingSafeEqual(x,y)}catch(e){return false}}
const DUMMY=hashPw('dummy-password-for-timing');
const strongEnough=pw=>typeof pw==='string'&&pw.length>=12&&pw.length<=200&&/[a-z]/i.test(pw)&&/[0-9\W_]/.test(pw);
const EMAIL=/^[^\s@<>,;:"]+@[^\s@<>,;:"]+\.[^\s@<>,;:"]{2,}$/;
const IDLE=8*3600e3,ABS=7*24*3600e3;
function parseCookies(h){const o={};String(h||'').split(';').forEach(p=>{const i=p.indexOf('=');if(i>0)o[p.slice(0,i).trim()]=decodeURIComponent(p.slice(i+1).trim())});return o}
function createSession(db,userId){const token=rid(32),csrf=rid(16),t=now();db.prepare('INSERT INTO sessions(id,user_id,csrf,created_at,last_seen,expires_at) VALUES(?,?,?,?,?,?)').run(sha(token),userId,csrf,t,t,new Date(Date.now()+ABS).toISOString());return token}
function authenticate(db,req){const tok=parseCookies(req.headers.cookie).cms_sid;if(!tok)return null;const s=db.prepare('SELECT * FROM sessions WHERE id=?').get(sha(tok));if(!s)return null;const n=Date.now();
 if(n>Date.parse(s.expires_at)||n-Date.parse(s.last_seen)>IDLE){db.prepare('DELETE FROM sessions WHERE id=?').run(s.id);return null}
 db.prepare('UPDATE sessions SET last_seen=? WHERE id=?').run(now(),s.id);const u=db.prepare('SELECT id,email,name,role,must_change FROM users WHERE id=?').get(s.user_id);return u?{user:u,session:s}:null}
function cookie(token,req,clear){const secure=process.env.COOKIE_SECURE==='true'||req.headers['x-forwarded-proto']==='https';return`cms_sid=${token||''}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${clear?0:ABS/1000}${secure?'; Secure':''}`}
const attempts=new Map();
function throttled(key,max,win){const t=Date.now();const a=(attempts.get(key)||[]).filter(x=>t-x<win);attempts.set(key,a);return a.length>=max}
function noteFail(key){const a=attempts.get(key)||[];a.push(Date.now());attempts.set(key,a);if(attempts.size>5000)for(const[k,v]of attempts)if(!v.some(x=>Date.now()-x<900000))attempts.delete(k)}
function login(db,email,pw,ip){const k1='e:'+String(email).toLowerCase(),k2='i:'+ip;if(throttled(k1,5,900000)||throttled(k2,20,900000))return{status:429,error:'Too many attempts. Try again in 15 minutes.'};
 const u=db.prepare('SELECT * FROM users WHERE email=?').get(String(email).trim().toLowerCase());const ok=verifyPw(String(pw||''),u?u.pass_hash:DUMMY);
 if(!u||!ok){noteFail(k1);noteFail(k2);return{status:401,error:'Invalid email or password.'}}
 attempts.delete(k1);db.prepare('UPDATE users SET last_login=? WHERE id=?').run(now(),u.id);return{status:200,token:createSession(db,u.id),user:u}}
module.exports={hashPw,verifyPw,strongEnough,EMAIL,createSession,authenticate,cookie,parseCookies,login,throttled,noteFail};
