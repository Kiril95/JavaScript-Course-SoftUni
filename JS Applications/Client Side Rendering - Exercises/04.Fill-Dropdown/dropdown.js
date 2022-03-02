import { render } from '../node_modules/lit-html/lit-html.js';
import { template } from './template.js';

const mainDiv = document.querySelector('#menu');
const form = document.querySelector('form');

async function generateOptions() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await response.json();

    render(template(Object.values(data)), mainDiv);
}

generateOptions();
form.addEventListener('submit', addItem);

async function addItem(event) {
    event.preventDefault();
    const textField = document.querySelector('#itemText');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textField.value })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        generateOptions();
        textField.value = '';

    } catch (error) {
        alert(error.message);
    }
}