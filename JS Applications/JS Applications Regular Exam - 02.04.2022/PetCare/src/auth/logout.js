import page from '../../node_modules/page/page.mjs';
import { updateNavigation } from './../navigation.js';

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
        
        updateNavigation();
        page.redirect('/');

    } catch (error) {
        alert(error.message);
    }
}