import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';
import { logout } from './logout.js';
import { showHomePage } from './home.js';
import { showAddMovieSection } from './create.js';

const main = document.querySelector('#views');
const nav = document.querySelector('nav');
const addBtn = document.querySelector('#add-movie-btn');

window.addEventListener('load', async () => {
    // Clean the dom tree and then set the homepage 
    main.replaceChildren();
    showHomePage();
    
    addBtn.addEventListener('click', showAddMovieSection); // ADD

    const links = {
        'loginLink': showLoginPage,
        'registerLink': showRegisterPage,
        'moviesLink': showHomePage,
        'logoutBtn': logout,
    };
    setupNavigation();

    function setupNavigation() {
        // View the link that has been clicked
        nav.addEventListener('click', (event) => {
            if (event.target.tagName == 'A') {
                const view = links[event.target.id];
    
                if (typeof view == 'function') {
                    event.preventDefault();
                    view();
                }
            }
        });
    }
})

export function updateNavigation() {
    let email = sessionStorage.getItem('userEmail');

    if (sessionStorage.getItem('authToken')) {
        nav.querySelector('#welcomingMessage').textContent = `Welcome, ${email}`;

        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}
