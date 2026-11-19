'use strict';
const{DatabaseSync}=require('node:sqlite');const fs=require('fs'),path=require('path');
const SCHEMA=`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT DEFAULT '',role TEXT NOT NULL DEFAULT 'admin',pass_hash TEXT NOT NULL,must_change INTEGER NOT NULL DEFAULT 0,created_at TEXT,last_login TEXT);
CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,user_id INTEGER NOT NULL,csrf TEXT NOT NULL,created_at TEXT,last_seen TEXT,expires_at TEXT);
CREATE TABLE IF NOT EXISTS resets(token_hash TEXT PRIMARY KEY,user_id INTEGER NOT NULL,expires_at TEXT,used INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS docs(id INTEGER PRIMARY KEY,collection TEXT NOT NULL,slug TEXT,data TEXT NOT NULL,published TEXT,status TEXT NOT NULL DEFAULT 'draft',ord INTEGER DEFAULT 0,created_at TEXT,updated_at TEXT,published_at TEXT,publish_at TEXT,UNIQUE(collection,slug));
CREATE TABLE IF NOT EXISTS inquiries(id INTEGER PRIMARY KEY,name TEXT,email TEXT,company TEXT,subject TEXT,budget TEXT,message TEXT,created_at TEXT,status TEXT NOT NULL DEFAULT 'new',is_read INTEGER NOT NULL DEFAULT 0,notes TEXT DEFAULT '');
CREATE TABLE IF NOT EXISTS media(id INTEGER PRIMARY KEY,path TEXT UNIQUE NOT NULL,original TEXT,mime TEXT,size INTEGER,alt TEXT DEFAULT '',builtin INTEGER DEFAULT 0,created_at TEXT);
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT);
CREATE TABLE IF NOT EXISTS activity(id INTEGER PRIMARY KEY,at TEXT,user TEXT,action TEXT,target TEXT);
CREATE INDEX IF NOT EXISTS idx_docs_col ON docs(collection,status);`;
function open(file){fs.mkdirSync(path.dirname(file),{recursive:true});const db=new DatabaseSync(file);db.exec('PRAGMA journal_mode=WAL;PRAGMA foreign_keys=ON;PRAGMA busy_timeout=3000;');db.exec(SCHEMA);return db}
const tx=(db,fn)=>{db.exec('BEGIN');try{const r=fn();db.exec('COMMIT');return r}catch(e){try{db.exec('ROLLBACK')}catch(x){}throw e}};
module.exports={open,tx};
