document.getElementById('logout').addEventListener('click', logout);

async function logout(ev) {
    ev.preventDefault();
    await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
    });

    sessionStorage.clear(); // Clear tokens for this user
    window.location.href = './index.html';
}