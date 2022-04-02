import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { editTemplate } from '../../templates/editTemplate.js';

let mainDiv = document.querySelector('#content');

export async function editPage(ctx) {
    let targetId = ctx.params.id;

    const response = await fetch(`http://localhost:3030/data/pets/${targetId}`);
    const data = await response.json();

    render(editTemplate(data), mainDiv);
}

export async function editPet(event) {
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');

    const formData = new FormData(event.target);
    const form = document.querySelector('.editForm');

    let name = formData.get('name');
    let breed = formData.get('breed');
    let age = formData.get('age');
    let weight = formData.get('weight');
    let image = formData.get('image');

    if (name == '' || breed == '' || age == '' || weight == '' || image == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        let response = await fetch(`http://localhost:3030/data/pets/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, breed, age, weight, image })
        })
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        form.reset();
        updateNavigation();
        page.redirect(`/details/${targetId}`);

    } catch (error) {
        alert(error.message);
    }
}