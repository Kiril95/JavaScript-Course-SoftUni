import { createElement, showSection } from '../src/dom.js';
import { showDetails } from '../actions/details.js';

const dashboardSection = document.querySelector('#dashboard-holder');

export function showDashboardSection() {
    showSection(dashboardSection);
}

export async function displayIdeas() {
    dashboardSection.replaceChildren();
    showDashboardSection();

    try {
        const response = await fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info => {
            if (data.length > 0) {
                let mainDiv = createElement('div', '', 'card overflow-hidden current-card details', dashboardSection);
                mainDiv.style = "width: 20rem; height: 18rem;";

                let divEl = createElement('div', '', 'card-body', mainDiv);
                let paraEl = createElement('p', info.title, 'card-text', divEl);

                let imgEl = createElement('img', '', 'card-image', mainDiv);
                imgEl.setAttribute('src', info.img);
                imgEl.alt = 'Card image cap';

                let detailsAnchor = createElement('a', 'Details', 'btn', mainDiv);
                detailsAnchor.setAttribute('href', '#');
                detailsAnchor.setAttribute('data-id', info._id);

                detailsAnchor.addEventListener('click', showDetails); // Details

            } else {
                let h2El = createElement('h2', 'No ideas yet! Be the first one :)', '', dashboardSection);
            }
        })

    } catch (error) {
        alert(error.message);
    }
}