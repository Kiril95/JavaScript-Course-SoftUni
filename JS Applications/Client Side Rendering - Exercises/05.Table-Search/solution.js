import { render } from '../node_modules/lit-html/lit-html.js';
import { template } from './template.js';

function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    async function onClick() {
        let tableRows = document.querySelectorAll('tbody tr');
        let searchField = document.querySelector('#searchField');

        for (let row of tableRows) {
            row.removeAttribute('class', 'select');
        }

        if (searchField.value) {
            for (let row of tableRows) {
                if (row.innerHTML.includes(searchField.value)) {
                    row.setAttribute('class', 'select');
                }
            }
        }
       
        searchField.value = '';
    }
}

async function generateRows() {
    const tableBody = document.querySelector('.container tbody');

    const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
    const data = await response.json();

    render(template(Object.values(data)), tableBody);
}

generateRows();
solve();