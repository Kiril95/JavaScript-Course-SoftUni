import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { createTemplate } from '../../templates/createTemplate.js';

let mainDiv = document.querySelector('#content');

export function createPage() {
    render(createTemplate(), mainDiv);
}

export async function createCard(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('.createForm');

    let name = formData.get('name');
    let breed = formData.get('breed');
    let age = formData.get('age');
    let weight = formData.get('weight');
    let image = formData.get('image');

    if (name == '' || breed == '' || age == '' || weight == '' || image == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        const response = await fetch('http://localhost:3030/data/pets', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, breed, age, weight, image })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(data.message);
        }

        form.reset();
        updateNavigation();
        page.redirect('/');

    } catch (error) {
        alert(error.message);
    }
}