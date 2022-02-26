import { updateNavigation } from '../src/app.js';
import { showSection } from '../src/dom.js';
import { displayIdeas } from '../views/dashboard.js';

const main = document.querySelector('#views');
const homePage = document.querySelector('#home-view');
const dashboard = document.querySelector('#dashboard-holder');

export function showHomePage() {
    updateNavigation();
    main.replaceChildren();

    const fragment = document.createDocumentFragment();

    if (sessionStorage.getItem('authToken')) {
        displayIdeas();
        fragment.appendChild(dashboard);
    } else {
        fragment.appendChild(homePage);
    }

    showSection(fragment);
}