import { render } from '../../node_modules/lit-html/lit-html.js';
import { homeTemplate } from '../../templates/homeTemplate.js';

export async function homepage() {
    let mainDiv = document.querySelector('#site-content');

    render(homeTemplate(), mainDiv);
}