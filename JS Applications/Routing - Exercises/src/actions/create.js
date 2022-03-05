import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { loadFurniture } from '../views/dashboard.js';
import { updateNavigation } from '../app.js';
import { createTemplate } from '../../templates/createTemplate.js';

let mainDiv = document.querySelector('.container');
let errors = {};

export function createPage() {
    render(createTemplate(errors), mainDiv);
}

export async function createItem(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#create-form');

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
        createPage();
        throw new Error('Make and Model must be at least 4 symbols long!');
    }
    if (year < 1950 || year > 2050) {
        errors['year'] = true;
        createPage();
        throw new Error('Year must be between 1950 and 2050!');
    }
    if (description.length < 11) {
        errors['description'] = true;
        createPage();
        throw new Error('Description must be more than 10 symbols!');
    }
    if (price < 0) {
        errors['price'] = true;
        createPage();
        throw new Error('Price must be a positive number!');
    }
    if (img == '') {
        errors['img'] = true;
        createPage();
        throw new Error('ImageUrl is required!');
    }

    try {
        const response = await fetch('http://localhost:3030/data/catalog', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ make, model, year, description, price, img, material })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            //form.reset();
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