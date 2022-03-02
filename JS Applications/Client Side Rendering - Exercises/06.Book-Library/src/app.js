import { render } from 'https://unpkg.com/lit-html?module';
import { templateBody, templateAdd, templateEdit } from '../templates/template.js';

const body = document.querySelector('body');

render([
    templateBody(),
    templateAdd(),
    templateEdit()
], body);
