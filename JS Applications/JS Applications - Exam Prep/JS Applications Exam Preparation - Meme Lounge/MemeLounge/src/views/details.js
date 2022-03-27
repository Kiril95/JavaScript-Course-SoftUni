import { render } from '../../node_modules/lit-html/lit-html.js';
import { detailsTemplate } from '../../templates/detailsTemplate.js';

export async function showDetails(ctx) {
    let mainDiv = document.querySelector('#site-content');
    let targetId = ctx.params.id;
    
    try {
        const response = await fetch(`http://localhost:3030/data/memes/${targetId}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(detailsTemplate(data), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}