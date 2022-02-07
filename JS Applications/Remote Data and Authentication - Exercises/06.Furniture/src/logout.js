document.getElementById('logoutBtn').addEventListener('click', logout);

async function logout(event) {
    event.preventDefault();
    await fetch('http://localhost:3030/users/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
    });

    sessionStorage.clear();
    window.location.href = './login.html';
}