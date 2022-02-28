import { render } from '../node_modules/lit-html/lit-html.js';
import { template } from './template.js'

const mainDiv = document.querySelector('#root');
const loadBtn = document.querySelector('#btnLoadTowns');

loadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const towns = document.querySelector('#towns').value.split(', ');

    render(template(towns), mainDiv);
});