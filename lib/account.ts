import {getDb} from '../db';
import {members} from '../db/schema';
import {eq,sql} from 'drizzle-orm';
export function identity(r:Request){const id=r.headers.get('oai-authenticated-user-id'),email=r.headers.get('oai-authenticated-user-email');return id&&email?{id,email:email.toLowerCase().trim()}:null;}
export async function myMember(r:Request){const user=identity(r);if(!user)return null;const db=getDb();const bound=await db.select().from(members).where(eq(members.accountId,user.id)).get();if(bound)return bound;const matches=await db.select().from(members).where(sql`lower(${members.email})=${user.email}`);return matches.length===1&&(!matches[0].accountId||matches[0].accountId===user.id)?matches[0]:null;}
export function safeMember(m:any){if(!m)return null;const {reviewNote,reviewedBy,accountId,...safe}=m;return safe;}
export const normalizePhone=(phone:string)=>phone.replace(/[\s-]/g,'').replace(/^0/,'+60');
