import { html } from '../node_modules/lit-html/lit-html.js';

export let dashTemplate = (data) => {
    return html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${data.length > 0 ? html` ${data.map(info => html `
            <div class="animals-board">
                <article class="service-img">
                    <img class="animal-image-cover" src="${info.image}">
                </article>
                <h2 class="name">${info.name}</h2>
                <h3 class="breed">${info.breed}</h3>
                <div class="action">
                    <a class="btn" href="/details/${info._id}">Details</a>
                </div>
            </div>`)}`
             
            : html`
            <div>
                <p class="no-pets">No pets in dashboard</p>
            </div>`}
    </section>
`;}