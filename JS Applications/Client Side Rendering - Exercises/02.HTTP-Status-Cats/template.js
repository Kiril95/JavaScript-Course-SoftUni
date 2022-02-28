import { html } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

export let template = () => html`
    <ul>
        ${cats.map(cat => html`
        <li>
            <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${showDetails} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id=${cat.id}>
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                </div>
            </div>
        </li>`)}
    </ul>
`;

function showDetails(event) {
    const detailsSection = event.target.parentNode.parentNode.querySelector('.status');

    if (detailsSection.style.display == 'block') {
        detailsSection.style.display = 'none';
        event.target.textContent = 'Show status code';
    } else {
        detailsSection.style.display = 'block';
        event.target.textContent = 'Hide status code';
    }
};