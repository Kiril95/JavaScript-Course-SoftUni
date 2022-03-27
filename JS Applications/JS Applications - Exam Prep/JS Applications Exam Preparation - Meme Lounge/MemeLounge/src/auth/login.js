import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { logTemplate } from '../../templates/loginTemplate.js';
import { alert } from '../actions/notification.js';

let mainDiv = document.querySelector('#site-content');

export function loginPage(){
    render(logTemplate(), mainDiv);
}

export async function loginUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#login-form');

    let email = formData.get('email');
    let password = formData.get('password');

    if (email == '' && password == '') {
        return alert('Please fill the required fields!');
    } else if (email == '') {
        return alert('Please enter your email address!');
    } else if (password == '') {
        return alert('Please enter your password!');
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
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('sex', data.gender);

        form.reset();
        updateNavigation();
        page.redirect('/all-memes');

    } catch (error) {
        alert(error.message);
    }
}