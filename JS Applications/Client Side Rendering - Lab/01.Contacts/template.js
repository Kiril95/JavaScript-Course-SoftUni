import { html } from '../node_modules/lit-html/lit-html.js';

export let template = (data) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button @click=${showDetails} class="detailsBtn">Details</button>
        <div class="details" id=${data.id}>
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;

function showDetails(event) {
    const detailsSection = event.target.parentNode.querySelector('.details');

    if (detailsSection.style.display == 'block') {
        detailsSection.style.display = 'none';
    } else {
        detailsSection.style.display = 'block';
    }
};