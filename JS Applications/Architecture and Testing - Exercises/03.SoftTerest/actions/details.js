import { createElement } from '../src/dom.js';
import { deleteIdea } from './delete.js';

const dashboardSection = document.querySelector('#dashboard-holder');

export async function showDetails(event) {
    dashboardSection.replaceChildren();

    let targetId = event.target.getAttribute('data-id');
    let fragment = document.createDocumentFragment();

    try {
        const response = await fetch(`http://localhost:3030/data/ideas/${targetId}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        let mainDiv = createElement('div', '', 'container home some', fragment);

        let imgEl = createElement('img', '', 'det-img', mainDiv);
        imgEl.setAttribute('src', data.img);

        let divEl = createElement('div', '', 'desc', mainDiv);
        let h2El = createElement('h2', data.title, 'display-5', divEl);
        let para1El = createElement('p', 'Description: ', 'infoType', divEl);
        let para2El = createElement('p', data.description, 'idea-description', divEl);

        if (sessionStorage.getItem('userId') == data._ownerId) {
            let btnDiv = createElement('div', '', 'text-center', mainDiv);
            let deleteAnchor = createElement('a', 'Delete', 'btn detb', mainDiv);
            deleteAnchor.setAttribute('href', '');
            deleteAnchor.setAttribute('data-id', data._id);

            deleteAnchor.addEventListener('click', deleteIdea); // Del
        }
        //sessionStorage.getItem('userId') == data._ownerId ? deleteAnchor.style.display = 'block' : deleteAnchor.style.display = 'none';
        dashboardSection.appendChild(fragment);

    } catch (error) {
        alert(error.message);
    }
}