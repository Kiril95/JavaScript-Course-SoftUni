import { render } from '../../node_modules/lit-html/lit-html.js';
import { homepageTemplate } from '../../templates/homeTemplate.js';

export async function homepage() {
    let mainDiv = document.querySelector('#site-content');

    render(homepageTemplate(), mainDiv);
    window.scrollTo(0, 0);
}