import { isInvitationValid } from "./db/invitations";
import { areInvitationsActive } from './web3/areInvitationsActive.js';
import { areReservationsActive } from './web3/areReservationsActive.js';
import { mintByInvitation } from "./web3/mintByInvitation.js";

async function submitSelection() {

    // clear all previous error messages
    const mintingError = document.getElementById('tiersErrorMessage');
    if(mintingError){
        mintingError.innerHTML = "";
    }
    
    // are invitations active?
    let params = new URLSearchParams(window.location.search);

    let invitationId = params.get('invitationId'); 
    let reservationId = params.get('reservationId');
    console.log('invitationId',  invitationId);
    console.log('reservationId', reservationId)

    if(invitationId){
        const invitationsActive = areInvitationsActive();
        if(invitationsActive){
            let invitationValid = await isInvitationValid(invitationId);
            console.log('invitationValid: ', invitationValid);
            if(!invitationValid){
                const tierErrorMessageButton = document.getElementById('tiersErrorMessage');
                if(tierErrorMessageButton){
                    tierErrorMessageButton.inner.html = "Invalid invitation"
                    tierErrorMessageButton.style.display = "block";
                    // disable click functionallity
                    console.log('invitations invalid!');
                }
            }
        }
    }
    // are reservations active
    if(reservationId){
        const reservationsActive = areReservationsActive();
        if(reservationsActive){
            const reservationValid = await areReservationsActive(reservationId);
            if(!reservationValid){
                const tierErrorMessageButton = document.getElementById('tiersErrorMessage');
                if(tierErrorMessageButton){
                    tierErrorMessageButton.inner.html = "Invalid invitation"
                    tierErrorMessageButton.style.display = "block";
                    // technical debt
                    // disable click functionallity
                    console.log('reservations invalid!');
                }
            
            }
        }
    }

    // if both are good - > mint()
    const selectedTier = document.querySelector('#priceTiers input[type="radio"]:checked');
    if (!selectedTier) {
        // technical debt
        // disable click functionallity
        console.log(`Selected Tier: ${selectedTier.value}`);
    }
    let tokenId = localStorage.getItem('tokenId');
    mintByInvitation(parseInt(tokenId, 10), invitationId, selectedTier);

}

window.submitSelection = submitSelection;
export {submitSelection}