import { html } from '../node_modules/lit-html/lit-html.js';

export let template = (data) => html`
    ${data.map(x => html`<option value=${x._id}>${x.text}</option>`)}
`;