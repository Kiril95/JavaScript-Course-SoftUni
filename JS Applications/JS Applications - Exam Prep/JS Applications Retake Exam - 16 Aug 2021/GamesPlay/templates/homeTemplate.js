import { html } from '../node_modules/lit-html/lit-html.js';

export const homepageTemplate = (data) => {
    return html`
    <section id="welcome-world">
        <div class="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in GamesPlay</h3>
        </div>
        <img src="./images/four_slider_img01.png" alt="hero">
    
        <div id="home-page">
            <h1>Latest Games</h1>
    
            ${data.length > 0 ? html`
                ${data.map(info => html`
                    <div class="game">
                        <div class="image-wrap">
                            <img src=${info.imageUrl}>
                        </div>
                    <h3>${info.title}</h3>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                    <div class="data-buttons">
                        <a href="/details/${info._id}" class="btn details-btn">Details</a>
                    </div>
                </div>`)}` 
                
            : html `<p class="no-articles">No games yet</p>`}
        </div>
    </section>
`;}