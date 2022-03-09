import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { teamTemp } from './teamTemplate.js';

export let teamsTemp = (data) => {
    let isLoggedIn = sessionStorage.getItem('authToken');

    return html`
    <section id="browse">
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>
    
        ${isLoggedIn ? html`
        <article class="layout narrow">
            <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
        </article>` : ''}
    
        ${until(data.map(teamTemp), html`<p>Loading &#x21bb;</p>`)}
    </section>
`;}