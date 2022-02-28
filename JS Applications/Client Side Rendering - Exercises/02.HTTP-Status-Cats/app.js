import { render } from '../node_modules/lit-html/lit-html.js';
import { template } from './template.js'
import { cats } from './catSeeder.js';

const mainDiv = document.querySelector('#allCats');
const result = cats.map(template);

render(template(result), mainDiv);