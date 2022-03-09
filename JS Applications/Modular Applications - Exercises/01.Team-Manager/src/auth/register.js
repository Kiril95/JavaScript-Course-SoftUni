import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { loadTeams } from '../views/teams.js';
import { updateNavigation } from '../navigation.js';
import { regTemplate } from '../../templates/registrationTemplate.js';

let main = document.querySelector('#views');

export function registrationPage(){
    render(regTemplate(), main);
}

export async function registerUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#register-form');

    let email = formData.get('email');
    let username = formData.get('username');
    let password = formData.get('password');
    let repass = formData.get('repass');
    
    if (email == '' || username == '' || password == '' || repass == '') {
        return alert('Please fill the required fields!');
    }

    try {
        const pattern = /[\w]+[A-Za-z]+[\w]+/g;
        
        if(username.length < 3){
            throw new Error('Username must be at least 3 characters long!');
        }
        if(!pattern.test(password) || password.length < 3){
            throw new Error('Password must be at least 3 characters long and include digits!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-type': 'aplication/json' },
            body: JSON.stringify({ email, username, password })
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
        render(regTemplate(error.message), main);
    }
}