import page from '../../node_modules/page/page.mjs';
import { loadFurniture } from '../views/dashboard.js';

export async function deleteItem(event) {
    let targetId = event.target.getAttribute('data-id');
    let title = event.target.parentNode.parentNode.querySelector('p > span');
    
    const confirmed = confirm(`Are you sure you want to delete - ${title.textContent} ?`);
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3030/data/catalog/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            loadFurniture();

        } catch (error) {
            loadFurniture();
            alert(error.message);
        }

        page.redirect('/dashboard');
    }
}