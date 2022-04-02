import page from '../node_modules/page/page.mjs';

import { updateNavigation } from './navigation.js';
import { registrationPage } from './auth/register.js';
import { loginPage } from './auth/login.js';
import { logout } from './auth/logout.js';
import { homepage } from './views/home.js';
import { loadPets } from './views/dashboard.js';
import { createPage } from './actions/create.js';
import { showDetails } from './views/details.js';
import { editPage } from './actions/edit.js';
import { deleteBook } from './actions/delete.js';
import { donate } from './actions/donate.js';

document.querySelector('#logoutBtn').addEventListener('click', logout);

page('/login', loginPage);
page('/register', registrationPage);
page('/', homepage);
page('/dashboard', loadPets);
page('/details/:id', showDetails);
page('/create', createPage);
page('/edit/:id', editPage);
page('/delete/:id', deleteBook);
page('/donate/:id', donate);

updateNavigation();
page.start();