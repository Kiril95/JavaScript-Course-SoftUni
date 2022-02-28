import { render } from '../node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js'
import { template } from './template.js'

const contactsDiv = document.querySelector('#contacts');
const result = contacts.map(template);

render(result, contactsDiv);