import { createElement } from './dom.js';
import { showSection } from './dom.js';

const main = document.querySelector('main');
const editSection = document.querySelector('#edit');
let targetId = '';

export async function displayRecipes() {
    main.replaceChildren();

    const sectionElement = createElement('section', undefined, undefined, main);
    sectionElement.id = 'catalog';

    try {
        const response = await fetch('http://localhost:3030/data/recipes');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error ${response.status}!`);
        }

        // Display only if logged in
        if (sessionStorage.getItem('authToken')) {
            Object.values(data).map(info => {
                const articleElement = createElement('article', undefined, 'preview', sectionElement);

                const divElement = createElement('div', undefined, 'title', articleElement);
                const h2Element = createElement('h2', info.name, undefined, divElement);
                const div2Element = createElement('div', undefined, 'small', articleElement);
                const imgElement = createElement('img', undefined, undefined, div2Element);
                imgElement.setAttribute('src', info.img);

                articleElement.addEventListener('click', () => generateRecipe(info._id, articleElement)); // Click on a recipe
            });
        }

    } catch (error) {
        alert(error.message);
    }
}

async function generateRecipe(id, targetRecipe) {
    const url = `http://localhost:3030/data/recipes/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error ${response.status}!`);
        }

        const articleElement = createElement('article');
        articleElement.setAttribute('data-id', id); // 'Id' for easier work

        const h2Element = createElement('h2', data.name, undefined, articleElement);

        const divElement = createElement('div', undefined, 'band', articleElement);
        const div2Element = createElement('div', undefined, 'thumb', divElement);

        const imgElement = createElement('img', undefined, undefined, div2Element);
        imgElement.setAttribute('src', data.img);

        const div3Element = createElement('div', undefined, 'ingredients', divElement);
        const h3Element = createElement('h3', 'Ingredients', undefined, div3Element);

        const ulElement = createElement('ul', undefined, undefined, div3Element);

        Object.values(data.ingredients).map(ingredient => {
            const li = createElement('li', ingredient, undefined, ulElement)
        });

        const div4Element = createElement('div', undefined, 'description', articleElement);
        const h3PreparationElement = createElement('h3', 'Preparation', undefined, div4Element);

        Object.values(data.steps).map(step => {
            createElement('p', step, undefined, div4Element)
        });

        const buttonsDiv = createElement('div', undefined, 'controls', articleElement);
        const editBtn = createElement('button', '\u270E Edit', undefined, buttonsDiv);
        const deleteBtn = createElement('button', '\u2716 Delete', undefined, buttonsDiv);

        editBtn.addEventListener('click', handleForm);  // Set the values
        deleteBtn.addEventListener('click', deleteRecipe);// DELETE

        targetRecipe.replaceWith(articleElement);  // Replaces an Element with another

    } catch (error) {
        alert(error.message);
    }
}

async function deleteRecipe(event) {
    targetId = event.target.parentNode.parentNode.getAttribute('data-id');
    let recipeName = event.target.parentNode.parentNode.querySelector('h2');
    // This makes an alert and the user has to confirm(click)
    const confirmed = confirm(`Are you sure you want to delete ${recipeName.textContent}?`);

    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3030/data/recipes/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            displayRecipes();

            // Leaves a box with a message that the recipe was deleted
            const articleElement = createElement('article', undefined, 'preview', main);
            const h2Element = createElement('h2', `${recipeName.textContent} was deleted`, undefined, articleElement);

        } catch (error) {
            displayRecipes();
            alert(error.message);
        }
    }
}

async function handleForm(event) {
    // View the Edit form and put the targeted values in the fields to be ready for editing
    event.preventDefault();
    targetId = event.target.parentNode.parentNode.getAttribute('data-id');
    showSection(editSection);
    
    const response = await fetch(`http://localhost:3030/data/recipes/${targetId}`);
    const data = await response.json();

    editSection.querySelector('[name="name"]').value = data.name;
    editSection.querySelector('[name="img"]').value = data.img;
    editSection.querySelector('[name="ingredients"]').value = data.ingredients.join('\n');
    editSection.querySelector('[name="steps"]').value = data.steps.join('\n');

    const form = editSection.querySelector('form');
    form.addEventListener('submit', editRecipe)  // Save changes
}

async function editRecipe(event) {
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

    try {
        const response = await fetch(`http://localhost:3030/data/recipes/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, img, ingredients, steps })
        });

        if (!response.ok || response.status != 200) {
            let data = await response.json();
            throw new Error(data.message);
        }

        displayRecipes();

    } catch (error) {
        displayRecipes();
        alert(error.message);
    }
}
