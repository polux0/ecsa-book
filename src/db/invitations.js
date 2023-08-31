import {initiateSupabase} from './supabase';

const supabase = initiateSupabase();

async function isInvitationValid(invitationValue) {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('value', invitationValue)
            .eq('used_by_wallet', "0x")
            .limit(1);
        
        if (error) throw error;
        console.log('supabase data response: ', data);
        return data && data.length > 0;
    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return false;
    }
}
async function setInvitationUsed(invitationValue, usedByWallet) {
    try {
        const { error } = await supabase
            .from('invitations')
            .update({ used_by_wallet: usedByWallet })
            .eq('value', invitationValue);
        
        if (error) throw error;

        console.log('Invitation marked as used.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}

async function setInvitationInvitedBy(invitedByInvitationId, invitation) {
    try {
        const { error } = await supabase
            .from('invitations')
            .update({ invited_by_invitation_id: invitedByInvitationId })
            .eq('value', invitation);
        
        if (error) throw error;
        console.log('Invitation marked as ivnited by.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}
async function setInvitationInvitedByReservation(invitedByReservationId, invitation) {
    try {
        const { error } = await supabase
            .from('invitations')
            .update({ invited_by_reservation_id: invitedByReservationId })
            .eq('value', invitation);
        
        if (error) throw error;
        console.log('Invitation marked as ivnited by.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}

async function getNextThreeInvitations() {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('used_by_wallet', '0x')
            .limit(3);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching next three invitations:", error);
        return null;
    }
}
async function getInvitationByInvitationValue(invitationValue) {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('value', invitationValue)
            .limit(1);
        
        if (error) throw error;
        console.log('getInvitationByInvitationValue data response: ', data);

        // If data is present and has a length greater than 0, return the first invitation. 
        // Otherwise, return null.
        return data;

    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return null;
    }
}

async function setInvitationsCreatedWithInvitationId(initialInvitationId, referralInvitations) {
    try {
        for (let invitation of referralInvitations) {
            invitation.invited_by_invitation_id = initialInvitationId;
        }
        
        const { error } = await supabase
            .from('invitations')
            .insert(referralInvitations);
        
        if (error) throw error;

        console.log('Invitations set with the invitation ID.');
    } catch (error) {
        console.error("Error setting invitations with the invitation ID:", error);
    }
}


export {isInvitationValid, getNextThreeInvitations, setInvitationUsed, getInvitationByInvitationValue, setInvitationsCreatedWithInvitationId, setInvitationInvitedBy, setInvitationInvitedByReservation}
