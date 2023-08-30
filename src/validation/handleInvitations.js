import { isInvitationValid } from "./db/invitations";
import { areInvitationsActive } from './web3/areInvitationsActive.js';


async function handleInvitation(invitationId) {
    const invitationsActive = areInvitationsActive();
    if (invitationsActive) {
        const invitationValid = await isInvitationValid(invitationId);
        if (!invitationValid) {
            return false;
        }
        else return true;
    }
}
export {handleInvitation}