import { updateNavigation } from '../src/app.js';
import { showHomePage } from '../views/home.js';

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

        sessionStorage.clear();
        
        showHomePage();
        updateNavigation();

    } catch (error) {
        alert(error.message);
    }
}