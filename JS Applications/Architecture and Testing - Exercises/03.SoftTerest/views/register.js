import { showSection } from '../src/dom.js';
import { showHomePage } from './home.js';

const form = document.querySelector('#register-form');

const regSection = document.querySelector('#register-view');
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
    const pattern = /[\w]{2,}[\d]{1,}[\w]+@[A-Za-z]+.[A-Za-z]+/g;

    if (email == '' || password == '' || repass == '') {
        return alert('Please fill the required fields!');
    // } else if(!pattern.test(email)){
    //     return alert('The email should be at least 3 characters long and must contain digits and special characters!')
    } else if (password.length < 3) {
        return alert('Password should be at least 3 characters long!');
    } else if (password !== repass) {
        return alert("Passwords don't match!");
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
        showHomePage();

    } catch (error) {
        alert(error.message);
    }
}