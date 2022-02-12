import { showHomePage } from './home.js';

export async function deleteMovie(event) {
    let targetId = event.target.getAttribute('data-id');
    let titleName = event.target.parentNode.parentNode.parentNode.querySelector('h1');

    const confirmed = confirm(`Are you sure you want to delete ${titleName.textContent} ?`);
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3030/data/movies/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            showHomePage();

        } catch (error) {
            showHomePage();
            alert(error.message);
        }
    }
}