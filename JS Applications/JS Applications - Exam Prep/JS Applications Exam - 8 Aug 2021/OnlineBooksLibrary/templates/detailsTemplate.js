import { html } from '../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (item, totalLikes, hasUserLiked) => {
    let isOwner = item._ownerId == sessionStorage.getItem('userId');
    let isLoggedIn = sessionStorage.getItem('authToken');

    return html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${item.title}</h3>
            <p class="type">Type: ${item.type}</p>
            <p class="img"><img src=${item.imageUrl}></p>
            <div class="actions">
                ${isOwner ? html`
                <a class="button" href="/edit/${item._id}">Edit</a>
                <a class="button" href="/delete/${item._id}">Delete</a>` : ''}
    
                ${!isOwner && isLoggedIn && !hasUserLiked ? html`<a class="button" href="/like/${item._id}">Like</a>` : ''}
    
                <div class="likes">
                    <img class="hearts" src="../images/heart.png">
                    <span id="total-likes">Likes: ${totalLikes}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${item.description}</p>
        </div>
    </section>
`;}