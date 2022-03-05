import { render } from '../../node_modules/lit-html/lit-html.js';
import { dashTemplate } from '../../templates/dashTemplate.js';

export async function loadFurniture() {
    let mainDiv = document.querySelector('.container');

    try {
        const response = await fetch(`http://localhost:3030/data/catalog/`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        if (sessionStorage.getItem('authToken')) {
            render(dashTemplate(Object.values(data)), mainDiv);
        }

    } catch (error) {
        alert(error.message);
    }
}