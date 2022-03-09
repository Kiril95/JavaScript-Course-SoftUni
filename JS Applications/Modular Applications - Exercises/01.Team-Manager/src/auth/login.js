import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { loadTeams } from '../views/teams.js';
import { updateNavigation } from '../navigation.js';
import { logTemplate } from '../../templates/loginTemplate.js';

let main = document.querySelector('#views');

export function loginPage(){
    render(logTemplate(), main);
}

export async function loginUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#login-form');

    let email = formData.get('email');
    let password = formData.get('password');

    if (email == '' && password == '') {
        alert('Please fill the required fields!');
        return;
    } else if (email == '') {
        alert('Please enter your email address!');
        return;
    } else if (password == '') {
        alert('Please enter your password!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-type': 'aplication/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(data.message);
        }
        
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('username', data.username);

        form.reset();
        updateNavigation();
        loadTeams();
        page.redirect('/teams');

    } catch (error) {
        render(logTemplate(error.message), main);
    }
}