import { updateNavigation } from './app.js';
import { showSection } from './dom.js';
import { displayMovies } from './details.js';

const main = document.querySelector('#views');

const homePage = document.querySelector('#home-page');
const addBtn = document.querySelector('#add-movie-button');
const movieSection = document.querySelector('#movie');

export function showHomePage(){
    // This function also updates the nav-bar and displays the movies, so we can use it everywhere
    updateNavigation();
    main.replaceChildren();

    const fragment = document.createDocumentFragment();

    fragment.appendChild(homePage);

    if (sessionStorage.getItem('authToken')) {
        displayMovies();
        fragment.appendChild(addBtn);
        fragment.appendChild(movieSection);
    }

    showSection(fragment);
}