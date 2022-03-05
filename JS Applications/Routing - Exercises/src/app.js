import page from '../node_modules/page/page.mjs';
import { loadFurniture } from './views/dashboard.js';
import { registrationPage } from './users/register.js';
import { logout } from './users/logout.js';
import { loginPage } from './users/login.js';
import { createPage } from './actions/create.js';
import { showDetails } from './views/details.js';
import { editPage } from './actions/edit.js';
import { showUserItems } from './views/myFurniture.js';

document.querySelector('#logoutBtn').addEventListener('click', logout);

page('/home', loadFurniture);
page('/dashboard', loadFurniture);
page('/details/:id', showDetails);
page('/create', createPage);
page('/edit/:id', editPage);
//page('/delete/:id', deleteItem); // Could have easily done this, but wanted to try a different approach: (Check - detailsTemplate.js)
page('/login', loginPage);
page('/register', registrationPage);
page('/my-furniture', showUserItems);

updateNavigation();
page.start();

export function updateNavigation(){
    if(sessionStorage.getItem('authToken')){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}