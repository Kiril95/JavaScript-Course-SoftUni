import { html } from '../node_modules/lit-html/lit-html.js';

export const catalogTemplate = (data) => {
    return html`
    <section id="catalog-page">
        <h1>All Games</h1>

        ${data.length > 0 ? html `${data.map(info => html `
        <div class="allGames">
            <div class="allGames-info">
                <img src=${info.imageUrl}>
                <h6>${info.category}</h6>
                <h2>${info.title}</h2>
                <a href="/details/${info._id}" class="details-button">Details</a>
            </div>
        </div>`)}` 

        : html `<h3 class="no-articles">No articles yet</h3>`}
    </section>
`;}