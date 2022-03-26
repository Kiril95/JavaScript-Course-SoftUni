import { render } from '../../node_modules/lit-html/lit-html.js';
import { catalogTemplate } from '../../templates/catalogTemplate.js';

export async function catalogPage() {
    let mainDiv = document.querySelector('#site-content');

    try {
        const response = await fetch(`http://localhost:3030/data/games?sortBy=_createdOn%20desc`);
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