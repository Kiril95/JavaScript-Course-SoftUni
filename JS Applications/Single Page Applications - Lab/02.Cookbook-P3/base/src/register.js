import { showSection } from './dom.js';
import { displayRecipes } from './catalog.js';

const form = document.querySelector('#registerForm');

// Detach from the tree(for a clean dom) but keep a reference so later we can attach it again
const section = document.querySelector('#register');
section.remove();

export function showRegisterPage() {
    showSection(section);
}

form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('rePass');

    if (email == '' || password == '' || repass == '') {
        alert('Please fill the required fields!');
        return;
    } else if (password !== repass) {
        alert('Passwords don\'t match!');
        return;
    }

    try {
        // Get the user's information and stash it in the storage
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