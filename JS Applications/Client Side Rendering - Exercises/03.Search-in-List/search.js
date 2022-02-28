import { render } from '../node_modules/lit-html/lit-html.js';
import { template } from './template.js';
import { towns } from './towns.js';

const mainDiv = document.querySelector('#towns');
const searchField = document.querySelector('#searchText');
const matchesField = document.querySelector('#result');
const searchBtn = document.querySelector('button');

render(template(towns), mainDiv);

searchBtn.addEventListener('click', search);

function search() {
    let listItems = document.querySelectorAll('li');
    let count = 0;

    Object.values(listItems).forEach(item => {
        item.classList = '';
    });

    Object.values(listItems).forEach(item => {
        if (item.textContent.toLowerCase().includes(searchField.value.toLowerCase())) {
            item.classList = 'active';
            count++;
        }
    })

    matchesField.textContent = `${count} matches found`;
}