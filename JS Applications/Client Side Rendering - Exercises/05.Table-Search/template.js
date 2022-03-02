import { html } from '../node_modules/lit-html/lit-html.js';

export let template = (data) => html`
    ${data.map(info => html
    `<tr id="${info._id}">
        <td>${info.firstName} ${info.lastName}</td>
        <td>${info.email}</td>
        <td>${info.course}</td>
    </tr>`)}
`;