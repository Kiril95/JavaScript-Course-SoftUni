import { html } from '../node_modules/lit-html/lit-html.js';

export const catalogTemplate = (data) => {
    let isLoggedIn = sessionStorage.getItem('authToken');

    return html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${data.length > 0 ? html `${data.map(info => html `
        <div class="card-box">
            <img src="${info.imgUrl}">
            <div>
                <div class="text-center">
                    <p class="name">Name: ${info.name}</p>
                    <p class="artist">Artist: ${info.artist}</p>
                    <p class="genre">Genre: ${info.genre}</p>
                    <p class="price">Price: $${info.price}</p>
                    <p class="date">Release Date: ${info.releaseDate}</p>
                </div>
                
                ${isLoggedIn ? html `
                <div class="btn-group">
                    <a href="/details/${info._id}" id="details">Details</a>
                </div>` : ''}
        
            </div>
        </div>`)}` 

        : html `<p>No Albums in Catalog!</p>`}
    </section>
`;}