import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { bookTemplate } from './bookTemplate.js';

export let dashTemplate = (data) => {
    return html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>

        ${data.length > 0 ? html`
        <ul class="other-books-list">
            ${until(data.map(bookTemplate), html`<p>Loading &#x21bb;</p>`)}
        </ul>` :
           html`<p class="no-books">No books in database!</p>`}
    </section>
`;}