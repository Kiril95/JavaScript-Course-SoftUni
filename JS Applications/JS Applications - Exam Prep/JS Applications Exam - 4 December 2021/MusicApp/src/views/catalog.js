import { render } from '../../node_modules/lit-html/lit-html.js';
import { catalogTemplate } from '../../templates/catalogTemplate.js';

export async function loadAlbums() {
    let mainDiv = document.querySelector('#site-content');

    try {
        const response = await fetch(`http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(catalogTemplate(Object.values(data)), mainDiv);
        window.scrollTo(0, 0);

    } catch (error) {
        alert(error.message);
    }
}