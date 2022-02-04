const form = document.querySelector('form');

form.addEventListener('submit', createRecipe)

async function createRecipe(event) {
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
            method: 'post',
            headers: { 'Content-type': 'aplication/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();  
            throw new Error(data.message);
        }

        sessionStorage.setItem('authToken', data.accessToken);
        window.location.pathname = '/base/index.html';

    } catch (error) {
        alert(error.message);
    }
}