import { render } from '../../node_modules/lit-html/lit-html.js';
import { homepageTemplate } from '../../templates/homeTemplate.js';

export async function homepage() {
    let mainDiv = document.querySelector('#site-content');

    try {
        const response = await fetch(`http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(homepageTemplate(Object.values(data)), mainDiv);
        window.scrollTo(0, 0);

    } catch (error) {
        alert(error.message);
    }
}