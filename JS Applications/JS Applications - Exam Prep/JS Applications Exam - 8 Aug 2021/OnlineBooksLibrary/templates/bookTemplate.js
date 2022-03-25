import { html } from '../node_modules/lit-html/lit-html.js';

export const bookTemplate = (item) => {
    return html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
`;}