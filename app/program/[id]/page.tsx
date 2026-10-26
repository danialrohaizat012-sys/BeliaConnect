import {getDb} from '../../../db';
import {posts} from '../../../db/schema';
import {eq} from 'drizzle-orm';
import {getChatGPTUser,chatGPTSignInPath} from '../../chatgpt-auth';
import ProgramSignup from './signup';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const program=await getDb().select().from(posts).where(eq(posts.id,id)).get();if(!program||program.published!=='1'||program.type!=='Program')return <main className="portal-page"><h1>Program tidak ditemui.</h1><a href="/">Kembali ke website</a></main>;const user=await getChatGPTUser();return <ProgramSignup program={program} signedIn={!!user} signInUrl={chatGPTSignInPath('/program/'+encodeURIComponent(id))}/>}
