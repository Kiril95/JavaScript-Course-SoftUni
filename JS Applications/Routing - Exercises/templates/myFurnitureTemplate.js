import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { itemTemplate } from '../templates/itemTemplate.js';

export let furnitureTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${until(data.map(itemTemplate), html`<p>Loading &#x21bb;</p>`)}
    </div>`