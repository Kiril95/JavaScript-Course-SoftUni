import { render } from '../../node_modules/lit-html/lit-html.js';
import { detailsTemplate } from '../../templates/detailsTemplate.js';
import { getLikes, haveYouLiked } from '../actions/likes.js';

export async function showDetails(ctx) {
    let mainDiv = document.querySelector('#site-content');
    let targetId = ctx.params.id;
    const totalLikes = await getLikes(targetId);
    const hasUserLiked = await haveYouLiked(targetId);
    
    try {
        const response = await fetch(`http://localhost:3030/data/books/${targetId}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(detailsTemplate(data, totalLikes, hasUserLiked), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}