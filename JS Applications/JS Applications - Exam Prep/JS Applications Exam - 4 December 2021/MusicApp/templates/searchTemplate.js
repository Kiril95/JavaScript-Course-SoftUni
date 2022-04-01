import { html } from '../node_modules/lit-html/lit-html.js';

export const searchTemplate = (searchByName, data) => {
    let isLoggedIn = sessionStorage.getItem('authToken');

    return html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${searchByName} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <div class="search-result">
            ${data.length > 0 ? data.map(info => html`
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
                    ${isLoggedIn ? html`
                    <div class="btn-group">
                        <a href="/details/${info._id}" id="details">Details</a>
                    </div>` : ''}
                </div>
            </div>`)
    
            : html`<p class="no-result">No result.</p>`}
        </div>
    </section>
`;}

export const searchBoxTemplate = (searchByName) => {
    return html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${searchByName} class="button-list">Search</button>
        </div>
    </section>
`;}