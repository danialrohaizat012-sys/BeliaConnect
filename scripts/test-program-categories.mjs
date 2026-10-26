import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const runtime = createRequire(require.resolve('wrangler/package.json'));
const { Miniflare } = runtime('miniflare');
const { build } = runtime('esbuild');
const result = await build({stdin:{contents:"import * as route from './app/api/data/route.ts'; export default {fetch(r){return r.method==='GET'?route.GET(r):route.POST(r)}}",resolveDir:process.cwd(),sourcefile:'category-tests.ts'},bundle:true,write:false,format:'esm',platform:'neutral',external:['cloudflare:workers'],conditions:['workerd','worker']});
const mf = new Miniflare({modules:true,script:result.outputFiles[0].text,compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],d1Databases:['DB'],cf:false});
try {
 const db = await mf.getD1Database('DB');
 const migration = await readFile('drizzle/0000_flaky_juggernaut.sql','utf8');
 for(const statement of migration.split('--> statement-breakpoint'))if(statement.trim())await db.prepare(statement).run();
 await db.prepare("INSERT INTO posts (id,type,title,description,date,location,url,published) VALUES ('legacy','Program','Legacy record','Preserve this','','','','1')").run();
 await db.prepare(await readFile('drizzle/0001_rich_junta.sql','utf8')).run();
 const legacy = await db.prepare("SELECT category,title FROM posts WHERE id='legacy'").first();
 assert.equal(legacy.category,null);assert.equal(legacy.title,'Legacy record');
 async function request(body,admin=true){const response=await mf.dispatchFetch('https://test.local/api/data',{method:'POST',headers:{'content-type':'application/json',origin:'https://test.local',...(admin?{'oai-authenticated-user-id':'test-owner'}:{})},body:JSON.stringify(body)});return {status:response.status,data:await response.json()};}
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
 console.log('PASS: legacy migration, three categories, required/invalid category validation, authorization, persistence, edits, opportunity category clearing, and draft visibility.');
} finally {await mf.dispose();}
