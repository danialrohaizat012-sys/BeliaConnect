import {requireChatGPTUser} from '../chatgpt-auth';
import {env} from 'cloudflare:workers';
import {isAdminIdentity} from '../../lib/admin-access';
import Hub from '../ui';
export const dynamic='force-dynamic';
export default async function Admin(){const user=await requireChatGPTUser('/admin');if(!isAdminIdentity(user.userId,user.email,(env as unknown as {ADMIN_EMAILS?:string}).ADMIN_EMAILS))return <main style={{maxWidth:600,margin:'80px auto',padding:24}}><h1>Akses urusetia sahaja</h1><p>Akaun ini tidak mempunyai akses untuk mengurus Belia Connect.</p><a href="/" className="btn">Kembali ke website</a></main>;return <Hub admin/>}
