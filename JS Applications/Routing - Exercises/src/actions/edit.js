import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { loadFurniture } from '../views/dashboard.js';
import { updateNavigation } from '../app.js';
import { editTemplate } from '../../templates/editTemplate.js';

let mainDiv = document.querySelector('.container');
let errors = {};

export async function editPage(ctx) {
    let targetId = ctx.params.id;

    const response = await fetch(`http://localhost:3030/data/catalog/${targetId}`);
    const data = await response.json();

    render(editTemplate(data, errors), mainDiv);
}

export async function editItem(event) {
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');
    
    const formData = new FormData(event.target);
    const form = document.querySelector('#edit-form');
    let make = formData.get('make');
    let model = formData.get('model');
    let year = formData.get('year');
    let description = formData.get('description');
    let price = formData.get('price');
    let img = formData.get('img');
    let material = formData.get('material');

    year = Number(year);
    price = Number(price);

    if (make == '' || model == '' || year == '' || description == '' || price == '' || img == '') {
        alert('Please fill the required fields!');
    }
    if (make.length < 4 || model.length < 4) {
        errors['make'] = true;
        errors['model'] = true;
        throw new Error('Make and Model must be at least 4 symbols long!');
    }
    if (year < 1950 || year > 2050) {
        errors['year'] = true;
        throw new Error('Year must be between 1950 and 2050!');
    }
    if (description.length < 11) {
        errors['description'] = true;
        throw new Error('Description must be more than 10 symbols!');
    }
    if (price < 0) {
        errors['price'] = true;
        throw new Error('Price must be a positive number!');
    }
    if (img == '') {
        errors['img'] = true;
        throw new Error('ImageUrl is required!');
    }

    try {
        let response = await fetch(`http://localhost:3030/data/catalog/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ make, model, year, description, price, img, material })
        })
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        form.reset();
        updateNavigation();
        loadFurniture();
        page.redirect('/dashboard');

    } catch (error) {
        alert(error.message);
    }
}