import { showSection } from './dom.js';
import { showHomePage } from './home.js';

const form = document.querySelector('#form-sign-up > form');

const regSection = document.querySelector('#form-sign-up');
regSection.remove();

export function showRegisterPage() {
    showSection(regSection);
}

form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('repeatPassword');

    if (email == '' || password == '' || repass == '') {
        return alert('Please fill the required fields!');
    } else if (password !== repass) {
        return alert('Passwords don\'t match!');
    } else if (password.length < 6) {
        return alert('Password should be at least 6 characters long!');
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

        showHomePage();

    } catch (error) {
        alert(error.message);
    }
}