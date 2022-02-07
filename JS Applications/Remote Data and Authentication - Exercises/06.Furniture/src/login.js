const formReg = document.querySelector('#register');
const formLog = document.querySelector('#login');

window.addEventListener('load', () => {
    formReg.addEventListener('submit', registerUser);
    formLog.addEventListener('submit', loginUser);
})

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
            formReg.reset();
            throw new Error(data.message);
        }

        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('userId', data._id);
        window.location.href = './homeLogged.html';

    } catch (error) {
        alert(error.message);
    }
}

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
            formLog.reset();
            throw new Error(data.message);
        }
        
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        window.location.href = './homeLogged.html';

    } catch (error) {
        alert(error.message);
    }
}