import { showSection } from './dom.js';
import { displayRecipes } from './catalog.js';

const createForm = document.querySelector('#createForm');

const createSection = document.querySelector('#create');
createSection.remove();

export function showCreatePage() {
    showSection(createSection);
}

createForm.addEventListener('submit', createRecipe)

async function createRecipe(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData
        .get('ingredients')
        .split('\n')
        .map(x => x.trim())
        .filter(x => x != '');

    let steps = formData
        .get('steps')
        .split('\n')
        .map(x => x.trim())
        .filter(x => x != '');

    if (name == '' || img == '' || ingredients == '' || steps == '') {
        alert('Please fill the required fields!');
        return;
    }

    try {
        // Save the recipe for this specific user
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, img, ingredients, steps })
        });

        if (!response.ok || response.status != 200) {
            const data = await response.json();
            throw new Error(data.message);
        }

        displayRecipes();

    } catch (error) {
        alert(error.message);
    }
}