import { html } from '../node_modules/lit-html/lit-html.js';

export const gameTemplate = (item) => {
    return html`
    <div class="game">
        <div class="image-wrap">
            <img src=${item.imageUrl}>
        </div>
        <h3>${item.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="btn details-btn">Details</a>
        </div>
    </div>
`;}