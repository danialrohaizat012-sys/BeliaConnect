import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const runtime = createRequire(require.resolve('wrangler/package.json'));
const { Miniflare } = runtime('miniflare');
const { build } = runtime('esbuild');
const result = await build({stdin:{contents:"import * as route from './app/api/data/route.ts'; export default {fetch(r){return r.method==='GET'?route.GET(r):route.POST(r)}}",resolveDir:process.cwd(),sourcefile:'category-tests.ts'},bundle:true,write:false,format:'esm',platform:'neutral',external:['cloudflare:workers'],conditions:['workerd','worker']});
const mf = new Miniflare({modules:true,script:result.outputFiles[0].text,compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],d1Databases:['DB'],bindings:{ADMIN_EMAILS:'test-owner@example.test'},cf:false});
try {
 const db = await mf.getD1Database('DB');
 const migration = await readFile('drizzle/0000_flaky_juggernaut.sql','utf8');
 for(const statement of migration.split('--> statement-breakpoint'))if(statement.trim())await db.prepare(statement).run();
 await db.prepare("INSERT INTO posts (id,type,title,description,date,location,url,published) VALUES ('legacy','Program','Legacy record','Preserve this','','','','1')").run();
 await db.prepare(await readFile('drizzle/0001_rich_junta.sql','utf8')).run();
 const legacy = await db.prepare("SELECT category,title FROM posts WHERE id='legacy'").first();
 assert.equal(legacy.category,null);assert.equal(legacy.title,'Legacy record');
 async function request(body,admin=true){const response=await mf.dispatchFetch('https://test.local/api/data',{method:'POST',headers:{'content-type':'application/json',origin:'https://test.local',...(admin?{'oai-authenticated-user-id':'test-owner','oai-authenticated-user-email':'test-owner@example.test'}:{})},body:JSON.stringify(body)});return {status:response.status,data:await response.json()};}
 const program={action:'post',type:'Program',title:'Test program',description:'Test description',published:true};
 for(const category of ['Networking','Pembangunan','CSR'])assert.equal((await request({...program,title:category,category})).status,200);
 assert.equal((await request({...program})).status,400);
 assert.equal((await request({...program,category:'Other'})).status,400);
 assert.equal((await request({...program,category:'CSR'},false)).status,401);
 const blocked=await mf.dispatchFetch('https://test.local/api/data?admin=1');assert.equal(blocked.status,401);
 let response=await mf.dispatchFetch('https://test.local/api/data');let data=await response.json();
 for(const category of ['Networking','Pembangunan','CSR'])assert.ok(data.posts.some(p=>p.category===category));
 const saved=data.posts.find(p=>p.category==='Networking');
 assert.equal((await request({...program,id:saved.id,category:'Pembangunan'})).status,200);
 assert.equal((await db.prepare('SELECT category FROM posts WHERE id=?').bind(saved.id).first()).category,'Pembangunan');
 assert.equal((await request({...program,id:saved.id,type:'Peluang',category:'CSR'})).status,200);
 assert.equal((await db.prepare('SELECT category FROM posts WHERE id=?').bind(saved.id).first()).category,null);
 assert.equal((await request({...program,title:'Draft only',category:'CSR',published:false})).status,200);
 response=await mf.dispatchFetch('https://test.local/api/data');data=await response.json();assert.ok(!data.posts.some(p=>p.title==='Draft only'));
 const strangerHeaders={'oai-authenticated-user-id':'other-user','oai-authenticated-user-email':'stranger@example.test'};
 const strangerRead=await mf.dispatchFetch('https://test.local/api/data?admin=1',{headers:strangerHeaders});assert.equal(strangerRead.status,401);
 const strangerWrite=await mf.dispatchFetch('https://test.local/api/data',{method:'POST',headers:{...strangerHeaders,'content-type':'application/json',origin:'https://test.local'},body:JSON.stringify({...program,category:'CSR'})});assert.equal(strangerWrite.status,401);
 const adminRead=await mf.dispatchFetch('https://test.local/api/data?admin=1',{headers:{'oai-authenticated-user-id':'test-owner','oai-authenticated-user-email':'test-owner@example.test'}});assert.equal(adminRead.status,200);
 const member={action:'join',name:'Age boundary test',nickname:'',phone:'0100000000',email:'test@example.test',age:'18',district:'Test',state:'Test',occupation:'Belajar',skills:'Test',interests:'Test',expectations:'',pledge:true,consent:true};
 for(const [index,age] of ['18','30'].entries()){const r=await request({...member,phone:'010000000'+index,age},false);assert.equal(r.status,200,JSON.stringify(r));}
 for(const age of ['17','31','18.5','NaN','Infinity','18abc','1e2']){const r=await request({...member,phone:'0100000099',age},false);assert.equal(r.status,400,age);assert.match(r.data.error,/18.*30/);}
 assert.equal((await db.prepare("SELECT COUNT(*) AS total FROM members").first()).total,2);
 console.log('PASS: legacy migration, three categories, required/invalid category validation, authorization, persistence, edits, opportunity category clearing, draft visibility, non-admin signed-in users denied, admin permitted, anonymous membership ages 18/30 accepted, and out-of-range or invalid ages rejected.');
} finally {await mf.dispose();}
