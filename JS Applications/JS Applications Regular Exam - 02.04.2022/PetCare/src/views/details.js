import { render } from '../../node_modules/lit-html/lit-html.js';
import { detailsTemplate } from '../../templates/detailsTemplate.js';
import { hasUserDonated, getDonationsForPet } from '../actions/donate.js';

export async function showDetails(ctx) {
    let mainDiv = document.querySelector('#content');
    let targetId = ctx.params.id;
    const totalDonations = await getDonationsForPet(targetId);
    const userDonated = await hasUserDonated(targetId);
    
    try {
        const response = await fetch(`http://localhost:3030/data/pets/${targetId}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(detailsTemplate(data, totalDonations, userDonated), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}