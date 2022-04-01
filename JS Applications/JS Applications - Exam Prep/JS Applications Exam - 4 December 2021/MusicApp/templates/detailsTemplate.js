import { html } from '../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (item) => {
    let isOwner = item._ownerId == sessionStorage.getItem('userId');
    let isLoggedIn = sessionStorage.getItem('authToken');

    return html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src="${item.imgUrl}">
            </div>
            <div class="albumInfo">
                <div class="albumText">
                    <h1>Name: ${item.name}</h1>
                    <h3>Artist: ${item.artist}</h3>
                    <h4>Genre: ${item.genre}</h4>
                    <h4>Price: $${item.price}</h4>
                    <h4>Date: ${item.releaseDate}</h4>
                    <p>Description: ${item.description}</p>
                </div>
    
                <!-- Only for registered user and creator of the album-->
                ${isOwner && isLoggedIn ? html `
                <div class="actionBtn">
                    <a href="/edit/${item._id}" class="edit">Edit</a>
                    <a href="/delete/${item._id}" class="remove">Delete</a>
                </div>` : ''}
    
            </div>
        </div>
    </section>
`;}