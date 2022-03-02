import { render } from 'https://unpkg.com/lit-html?module';
import { templateRow } from '../templates/template.js';

export async function loadBooks() {
    const tableBody = document.querySelector('tbody');
    //tableBody.replaceChildren();

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        render(templateRow(Object.entries(data)), tableBody);

    } catch (error) {
        alert(error.message);
    }
}