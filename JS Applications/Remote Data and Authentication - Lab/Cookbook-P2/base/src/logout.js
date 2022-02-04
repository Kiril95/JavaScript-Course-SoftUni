window.addEventListener('load', () => {
    let userView = document.getElementById('user');
    let guestView = document.getElementById('guest');
    let logoutBtn = document.getElementById('logoutBtn');

    if (sessionStorage.getItem('authToken')) {
		userView.style.display = 'inline-block';
		guestView.style.display = 'none';
		logoutBtn.addEventListener('click', logout);
	} else {
		userView.style.display = 'none';
		guestView.style.display = 'inline-block';
	}
});

async function logout() {
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    sessionStorage.removeItem('authToken');
    //localStorage.clear()
}