import { render } from '../../node_modules/lit-html/lit-html.js';
import { dashTemplate } from '../../templates/dashTemplate.js';

export async function loadBooks() {
    let mainDiv = document.querySelector('#site-content');

    try {
        const response = await fetch(`http://localhost:3030/data/books?sortBy=_createdOn%20desc`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        render(dashTemplate(Object.values(data)), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}