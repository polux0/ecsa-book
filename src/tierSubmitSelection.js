import { isInvitationValid } from "./db/invitations";
import { isReservationValid, isReservationValidForTokenId } from "./db/reservations";
import { areInvitationsActive } from './web3/areInvitationsActive.js';
import { areReservationsActive } from './web3/areReservationsActive.js';
import { isTokenReserved } from './web3/isTokenReserved.js';
import { mintByReservation } from './web3/mintByReservation.js';
import { mintByInvitation } from "./web3/mintByInvitation.js";
import { mintById } from "./web3/mintById";

async function submitSelection() {

    // clear all previous error messages
    const mintingError = document.getElementById('tiersErrorMessage');
    if(mintingError){
        mintingError.innerHTML = "";
    }
    const params = new URLSearchParams(window.location.search);
    const reservationId = params.get('reservationId') || "";
    const invitationId = params.get('invitationId') || "";
    const tokenId = localStorage.getItem('tokenId');
    const errors = [];
    const reservationsActive = await areReservationsActive();
    const invitationsActive = await areInvitationsActive();
    try {
        // Retrieving the chosenPrice
        const selectedTier = document.querySelector('#priceTiers input[type="radio"]:checked');
        let chosenPrice;

        if (selectedTier) {
            console.log(`Selected Tier: ${selectedTier.value}`);
            chosenPrice = selectedTier.value;
            mintingError.style.display = "block";
        } else {
            console.log("No price tier selected!");
            errors.push("Please select a price tier before proceeding.");
            const mintingError = document.getElementById('tiersErrorMessage');
            mintingError.innerHTML = "Please select a price tier before proceeding.";
            mintingError.style.display = "block";
            // technical debt - make mint button not clickable
            return; // Exit the function early if no tier is selected.
        }
    
            if (reservationsActive) {
                if (reservationId) {
                    // is reservationValid should be changed to take into account ReservationContract as well
                    let validReservation = await isReservationValidForTokenId(reservationId, parseInt(tokenId, 10));
                    console.log('is valid reservation: ', validReservation);
                    if (validReservation) {
                        console.log("It's a valid reservation, mint by reservation!");
                        mintByReservation(parseInt(tokenId, 10), reservationId, chosenPrice);
                        return;
                    } else {
                        console.log("Invalid reservation!");
                        errors.push("Invalid reservation!");
                    }
                } else {
                    console.log("Reservations are active but no reservation is provided.");
                    errors.push("Reservations are active but no reservation is provided.");
                }
            }
    
            if (invitationsActive) {
                if (invitationId) {
                    let validInvitation = await isInvitationValid(invitationId);
                    console.log('valid invitation? ', validInvitation);
                    if (validInvitation) {
                        const tokenReserved = await isTokenReserved(tokenId);
                        console.log(`is token reserved, ${tokenId}? `, tokenReserved);
                        console.log(`is reservation active? `, reservationsActive);
                        if (tokenReserved && reservationsActive) {
                            console.log("Token is reserved. Invitation not enough!");
                            errors.push("Token is reserved. Invitation not enough!");
                        } else {
                            mintByInvitation(parseInt(tokenId, 10), invitationId, chosenPrice);
                            return;
                        }
                    } else {
                        console.log("Invalid invitation!");
                        errors.push("Invalid invitation!");
                    }
                } else if (!reservationId) { // If no reservationId was provided earlier
                    console.log("Invitations are active, but no invitation is provided.");
                    errors.push("Invitations are active, but no invitation is provided.");
                }
            }
    
            if (!reservationsActive && !invitationsActive) {
                console.log("Mint by ID!");
                await mintById(tokenId, chosenPrice);
                return;
            }
    
            // If any errors have occurred and you're still in this function, display the last error message.
            if (errors.length > 0) {
                const mintingError = document.getElementById('tiersErrorMessage');
                mintingError.innerHTML = errors[errors.length - 1];
                mintingError.style.display = "block";
                console.log('errors: ', errors)
            }
    
        } catch (error) {
            // Handle any thrown errors here.
            console.error("An error occurred:", error.message);
        }   
}

window.submitSelection = submitSelection;
export {submitSelection}