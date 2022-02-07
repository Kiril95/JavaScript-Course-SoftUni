const form = document.querySelector('form');
let userView = document.getElementById('user');
let guestView = document.getElementById('guest');

userView.style.display = 'none';
guestView.style.display = 'inline-block';

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
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('userId', data._id);
        window.location.href = './index.html';

    } catch (error) {
        alert(error.message);
    }
}