import { render } from '../../node_modules/lit-html/lit-html.js';
import { detailsTemplate } from '../../templates/detailsTemplate.js';
import { getComments } from '../actions/comments.js';

export async function showDetails(ctx) {
    let mainDiv = document.querySelector('#site-content');
    let targetId = ctx.params.id;
    const comments = await getComments(targetId);
    
    try {
        const response = await fetch(`http://localhost:3030/data/games/${targetId}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(detailsTemplate(data, comments), mainDiv);
        window.scrollTo(0, 0);

    } catch (error) {
        alert(error.message);
    }
}