import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { bookTemplate } from '../templates/bookTemplate.js';

export let booksTemp = (data) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
    
        ${data.length > 0 ? html`
        <ul class="my-books-list">
            ${until(data.map(bookTemplate), html`<p>Loading &#x21bb;</p>`)}
        </ul>` :
        html`<p class="no-books">No books in database!</p>`}
    </section>`
