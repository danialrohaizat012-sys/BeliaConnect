import {env} from 'cloudflare:workers';
import {getDb} from '../../../db';
import {posts} from '../../../db/schema';
import {eq} from 'drizzle-orm';
import {isAdminIdentity} from '../../../lib/admin-access';
export const dynamic='force-dynamic';
const admin=(r:Request)=>isAdminIdentity(r.headers.get('oai-authenticated-user-id'),r.headers.get('oai-authenticated-user-email'),(env as unknown as {ADMIN_EMAILS?:string}).ADMIN_EMAILS);
const bucket=()=> (env as unknown as {BUCKET:R2Bucket}).BUCKET;
export async function POST(r:Request){
 if(!admin(r))return Response.json({error:'Akses ditolak.'},{status:401});
 if(r.headers.get('origin')!==new URL(r.url).origin)return Response.json({error:'Permintaan tidak sah.'},{status:403});
 try{
 if(Number(r.headers.get('content-length'))>3*1024*1024+10000)return Response.json({error:'Gambar terlalu besar. Had 3 MB.'},{status:413});
 const form=await r.formData();const file=form.get('file');
 if(!(file instanceof File)||!file.size||file.size>3*1024*1024)return Response.json({error:'Pilih gambar sehingga 3 MB.'},{status:400});
 const bytes=new Uint8Array(await file.arrayBuffer());
 const mime=bytes[0]===255&&bytes[1]===216&&bytes[2]===255?'image/jpeg':bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71?'image/png':String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP'?'image/webp':'';
 if(!mime)return Response.json({error:'Format disokong: JPG, PNG dan WebP.'},{status:400});
 const key=crypto.randomUUID();await bucket().put(key,bytes,{httpMetadata:{contentType:mime}});
 return Response.json({url:'/api/media?key='+key},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Gambar gagal dimuat naik. Sila cuba lagi.'},{status:500})}
}
export async function GET(r:Request){
 const key=new URL(r.url).searchParams.get('key');if(!key||!/^[-a-f0-9]{36}$/.test(key))return new Response('Not found',{status:404});
 try{
 if(!admin(r)){const rows=await getDb().select().from(posts).where(eq(posts.published,'1'));const url='/api/media?key='+key;const visible=rows.some(p=>p.poster===url||(p.type==='Galeri'&&JSON.parse(p.images||'[]').some((i:any)=>i.url===url)));if(!visible)return new Response('Not found',{status:404});}
 const object=await bucket().get(key);if(!object)return new Response('Not found',{status:404});
 return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'image/jpeg','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'"}});
 }catch{return new Response('Media unavailable',{status:503})}
}
