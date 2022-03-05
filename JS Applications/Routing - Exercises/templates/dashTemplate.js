import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { itemTemplate } from './itemTemplate.js';

export let dashTemplate = (data) => {
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${until(data.map(itemTemplate), html`<p>Loading &#x21bb;</p>`)}
    </div>
`;}