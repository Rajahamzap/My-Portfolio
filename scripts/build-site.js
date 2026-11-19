'use strict';
/* node scripts/build-site.js -> regenerates all public pages from the database */
const path=require('path'),{open}=require('../cms/db'),pub=require('../cms/publish');
const db=open(process.env.CMS_DB||path.join(__dirname,'..','data','cms.db'));require('../cms/migrate').run(db);console.log(pub.buildSite(db));db.exec('PRAGMA wal_checkpoint(TRUNCATE)');db.close();
