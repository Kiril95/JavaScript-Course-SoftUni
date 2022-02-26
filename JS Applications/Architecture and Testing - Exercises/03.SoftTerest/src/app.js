import { showLoginPage } from '../views/login.js';
import { showRegisterPage } from '../views/register.js';
import { logout } from '../views/logout.js';
import { showHomePage } from '../views/home.js';
import { displayIdeas } from '../views/dashboard.js';
import { showCreateSection } from '../actions/create.js';

const nav = document.querySelector('nav');

window.addEventListener('load', async () => {
    showHomePage();
    
    const links = {
        'loginLink': showLoginPage,
        'registerLink': showRegisterPage,
        'logoutBtn': logout,
        'dashboardLink': displayIdeas,
        'createLink': showCreateSection,
    };
    setupNavigation();

    function setupNavigation() {
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
    if (sessionStorage.getItem('authToken')) {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}