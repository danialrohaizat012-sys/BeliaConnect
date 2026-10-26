import {requireChatGPTUser} from '../chatgpt-auth';
import Hub from '../ui';
export const dynamic='force-dynamic';
export default async function Admin(){await requireChatGPTUser('/admin');return <Hub admin/>}
