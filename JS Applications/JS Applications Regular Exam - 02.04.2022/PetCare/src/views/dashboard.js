import { render } from '../../node_modules/lit-html/lit-html.js';
import { dashTemplate } from '../../templates/dashboardTemplate.js';

export async function loadPets() {
    let mainDiv = document.querySelector('#content');

    try {
        const response = await fetch(`http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(dashTemplate(Object.values(data)), mainDiv);
        window.scrollTo(0, 0);

    } catch (error) {
        alert(error.message);
    }
}