import { html } from '../node_modules/lit-html/lit-html.js';
import { deleteMeme } from '../src/actions/delete.js';

export let detailsTemplate = (item) => {
    let isOwner = item._ownerId == sessionStorage.getItem('userId');

    return html`
    <section id="meme-details">
        <h1>Meme Title: ${item.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${item.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${item.description}</p>

                ${isOwner ? html `
                <a class="button warning" href="/edit/${item._id}">Edit</a>
                <button class="button danger" data-id="${item._id}" @click=${e => deleteMeme(e)}>Delete</button>` : ''}
            </div>
        </div>
    </section>
`;}