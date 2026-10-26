import {requireChatGPTUser} from '../chatgpt-auth';
import MemberPortal from './portal';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/ahli');return <MemberPortal/>}
