import page from '../node_modules/page/page.mjs';

import { updateNavigation } from './navigations.js';
import { registrationPage } from './auth/register.js';
import { loginPage } from './auth/login.js';
import { logout } from './auth/logout.js';
import { loadBooks } from './views/dashboard.js';
import { createPage } from './actions/create.js';
import { showDetails } from './views/details.js';
import { editPage } from './actions/edit.js';
import { deleteBook } from './actions/delete.js';
import { showUserBooks } from './views/myBooks.js';
import { likeBook } from './actions/likes.js';

// This navigates to the dashboard when the user refreshes the page
// var evType = window.performance.getEntriesByType("navigation")[0].type;
// if (evType == 'reload') {
//     window.location.href = '/dashboard';
// }

document.querySelector('#logoutBtn').addEventListener('click', logout);

page('/dashboard', loadBooks);
page('/details/:id', showDetails);
page('/create', createPage);
page('/edit/:id', editPage);
page('/delete/:id', deleteBook);
page('/login', loginPage);
page('/register', registrationPage);
page('/my-books', showUserBooks);
page('/like/:id', likeBook);

updateNavigation();
page.start();