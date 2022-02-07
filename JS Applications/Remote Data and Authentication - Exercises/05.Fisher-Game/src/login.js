const form = document.querySelector('form');
let userView = document.getElementById('user');
let guestView = document.getElementById('guest');

userView.style.display = 'none';
guestView.style.display = 'inline-block';

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
        
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        window.location.href = './index.html';

    } catch (error) {
        alert(error.message);
    }
}