import { render } from '../../node_modules/lit-html/lit-html.js';
import { furnitureTemplate } from '../../templates/myFurnitureTemplate.js';

export async function showUserItems() {
    let mainDiv = document.querySelector('.container');
    let userId = sessionStorage.getItem('userId');

    try {
        const response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        render(furnitureTemplate(Object.values(data)), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}