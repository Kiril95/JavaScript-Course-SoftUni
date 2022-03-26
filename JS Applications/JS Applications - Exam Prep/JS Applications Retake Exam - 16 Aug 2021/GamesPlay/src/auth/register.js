import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { regTemplate } from '../../templates/registrationTemplate.js';

let mainDiv = document.querySelector('#site-content');

export function registrationPage(){
    render(regTemplate(), mainDiv);
}

export async function registerUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#register');

    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('confirm-password');

    if (email == '' || password == '' || repass == '') {
        return alert('Please fill the required fields!');
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
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

        form.reset();
        updateNavigation();
        page.redirect('/');

    } catch (error) {
        alert(error.message);
    }
}