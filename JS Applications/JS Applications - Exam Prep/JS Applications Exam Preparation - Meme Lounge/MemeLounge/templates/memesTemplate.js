import { html } from '../node_modules/lit-html/lit-html.js';

export let memesTemplate = (data) => {
    return html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${data.length > 0 ? html `${data.map(info => html `
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <p class="meme-title">${info.title}</p>
                        <img class="meme-image" alt="meme-img" src="${info.imageUrl}">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="/details/${info._id}">Details</a>
                    </div>
                </div>
            </div>`)}`
        
            : html `<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>
`;}