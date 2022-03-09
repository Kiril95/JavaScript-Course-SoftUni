import { render } from '../../node_modules/lit-html/lit-html.js';
import { homeTemplate } from '../../templates/homeTemplate.js';

export async function homePage() {
    let main = document.querySelector('#views');

    render(homeTemplate(), main);
}