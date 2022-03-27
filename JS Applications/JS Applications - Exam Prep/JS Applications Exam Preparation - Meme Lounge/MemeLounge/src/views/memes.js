import { render } from '../../node_modules/lit-html/lit-html.js';
import { memesTemplate } from '../../templates/memesTemplate.js';

export async function loadMemes() {
    let mainDiv = document.querySelector('#site-content');

    try {
        const response = await fetch(`http://localhost:3030/data/memes?sortBy=_createdOn%20desc`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(memesTemplate(Object.values(data)), mainDiv);
        window.scrollTo(0, 0);

    } catch (error) {
        alert(error.message);
    }
}