import { html } from '../node_modules/lit-html/lit-html.js';

export let template = (cities) => html`
    <ul>
        ${cities.map(town => html`<li>${town}</li>`)}
    </ul>
`;