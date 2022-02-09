import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';
import { displayRecipes } from './catalog.js';
import { showCreatePage } from './create.js';
import { logout } from './logout.js';

const nav = document.querySelector('nav');

window.addEventListener('load', async () => {
    // If the person is logged in, display user views
    if (sessionStorage.getItem('authToken')) {
        displayRecipes();
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }

    const links = {
        'loginLink': showLoginPage,
        'registerLink': showRegisterPage,
        'catalogLink': displayRecipes,
        'createLink': showCreatePage,
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
});

