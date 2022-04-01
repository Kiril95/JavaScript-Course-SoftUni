import page from '../node_modules/page/page.mjs';

import { updateNavigation } from './navigation.js';
import { registrationPage } from './auth/register.js';
import { loginPage } from './auth/login.js';
import { logout } from './auth/logout.js';
import { loadAlbums } from './views/catalog.js';
import { homepage } from './views/home.js';
import { createPage } from './actions/create.js';
import { showDetails } from './views/details.js';
import { editPage } from './actions/edit.js';
import { deleteAlbum } from './actions/delete.js';
import { searchPage } from './actions/search.js';

document.querySelector('#logoutBtn').addEventListener('click', logout);

page('/login', loginPage);
page('/register', registrationPage);
page('/catalog', loadAlbums);
page('/', homepage);
page('/details/:id', showDetails);
page('/create', createPage);
page('/edit/:id', editPage);
page('/delete/:id', deleteAlbum);
page('/search', searchPage);

updateNavigation();
page.start();