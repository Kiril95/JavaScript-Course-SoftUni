import page from '../node_modules/page/page.mjs';
import { updateNavigation } from '../src/navigation.js';
import { homePage } from '../src/views/home.js';
import { loadTeams } from '../src/views/teams.js';
import { registrationPage } from '../src/auth/register.js';
import { loginPage } from '../src/auth/login.js';
import { logout } from '../src/auth/logout.js';
import { createPage } from '../src/views/create.js';
import { showDetails } from '../src/views/details.js';

document.querySelector('#logoutBtn').addEventListener('click', logout);

homePage();
page('/home', homePage);
page('/teams', loadTeams);
page('/register', registrationPage);
page('/login', loginPage);
page('/create', createPage);
page('/details/:id', showDetails);

updateNavigation();
page.start();