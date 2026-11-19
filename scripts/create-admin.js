'use strict';
/* node scripts/create-admin.js you@example.com "a-strong-password"  -> creates (or resets) an admin account */
const path=require('path'),{open}=require('../cms/db'),A=require('../cms/auth');
const[email,pw]=process.argv.slice(2);if(!email||!pw){console.error('Usage: node scripts/create-admin.js <email> <password>');process.exit(1)}
if(!A.EMAIL.test(email)||!A.strongEnough(pw)){console.error('Use a valid email and a password of 12+ characters with a letter and a number or symbol.');process.exit(1)}
const db=open(process.env.CMS_DB||path.join(__dirname,'..','data','cms.db'));const e=email.toLowerCase(),h=A.hashPw(pw);
if(db.prepare('SELECT id FROM users WHERE email=?').get(e))db.prepare('UPDATE users SET pass_hash=?,must_change=0 WHERE email=?').run(h,e);else db.prepare("INSERT INTO users(email,name,role,pass_hash,must_change,created_at) VALUES(?,?,?,?,0,?)").run(e,'Admin','admin',h,new Date().toISOString());
db.prepare('DELETE FROM sessions').run();console.log('Admin account ready:',e);
