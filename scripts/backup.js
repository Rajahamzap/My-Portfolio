'use strict';
/* node scripts/backup.js -> copies the database (consistent snapshot) and the uploads folder into backups/<timestamp>/ */
const fs=require('fs'),path=require('path'),{open}=require('../cms/db');const R=path.join(__dirname,'..');
const dir=path.join(R,'backups',new Date().toISOString().replace(/[:.]/g,'-'));fs.mkdirSync(dir,{recursive:true});
const db=open(process.env.CMS_DB||path.join(R,'data','cms.db'));db.exec("VACUUM INTO '"+path.join(dir,'cms.db').replace(/'/g,"''")+"'");
if(fs.existsSync(path.join(R,'uploads')))fs.cpSync(path.join(R,'uploads'),path.join(dir,'uploads'),{recursive:true});console.log('Backup written to',dir);
