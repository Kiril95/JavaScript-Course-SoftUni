import { showSection } from './dom.js';
import { displayRecipes } from './catalog.js';

const form = document.querySelector('#loginForm');

const section = document.querySelector('#login');
section.remove();

export function showLoginPage() {
    showSection(section);
}

form.addEventListener('submit', loginUser)

async function loginUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

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

        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userEmail', data.email);
        displayRecipes();

    } catch (error) {
        alert(error.message);
    }
}