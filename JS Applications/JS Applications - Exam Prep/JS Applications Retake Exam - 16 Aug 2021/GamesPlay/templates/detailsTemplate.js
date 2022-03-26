import { html } from '../node_modules/lit-html/lit-html.js';
import { comment } from '../src/actions/comments.js';

export let detailsTemplate = (item, comments) => {
    let isOwner = item._ownerId == sessionStorage.getItem('userId');
    let isLoggedIn = sessionStorage.getItem('authToken');

    return html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src="${item.imageUrl}" />
                <h1>${item.title}</h1>
                <span class="levels">MaxLevel: ${item.maxLevel}</span>
                <p class="type">${item.category}</p>
            </div>
            <p class="text">${item.summary}</p>
    
            <div class="details-comments">
                <h2>Comments:</h2>
                ${comments.length > 0 ? html `
                <ul>
                    ${comments.map(info => html`
                    <li class="comment">
                        <p>Content: ${info.comment}</p>
                    </li>`)}
                </ul>` 

                : html `<p class="no-comment">No comments.</p>`}
            </div>
    
            ${isOwner ? html`
            <div class="buttons">
                <a href="/edit/${item._id}" class="button">Edit</a>
                <a href="/delete/${item._id}" class="button">Delete</a>
            </div>` : ''}
        </div>
    
        ${isLoggedIn && !isOwner ? html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form data-id="${item._id}" id="comm-section" class="form" @submit=${comment}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>` : ''}
    </section>
`;}