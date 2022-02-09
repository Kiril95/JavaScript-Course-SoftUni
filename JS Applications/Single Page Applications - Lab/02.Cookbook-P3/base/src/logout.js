const main = document.querySelector('main');

export async function logout() {
    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }

        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
        sessionStorage.clear();
        main.replaceChildren();

    } catch (error) {
        alert(error.message);
    }
}