import { render } from '../../node_modules/lit-html/lit-html.js';
import { profileTemplate } from '../../templates/myProfileTemplate.js';

export async function showUserMemes() {
    let mainDiv = document.querySelector('#site-content');
    let userId = sessionStorage.getItem('userId');

    try {
        const response = await fetch(`http://localhost:3030/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(profileTemplate(Object.values(data)), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}