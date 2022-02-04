const form = document.querySelector('form');

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
            method: 'post',
            headers: { 'Content-type': 'aplication/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();  // Clear the form
            throw new Error(data.message);  // The data has a special message
        }

        sessionStorage.setItem('authToken', data.accessToken);
        window.location.pathname = '/base/index.html'; // Return to the homepage

    } catch (error) {
        alert(error.message);
    }
}