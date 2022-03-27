import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { createTemplate } from '../../templates/createTemplate.js';
import { alert } from '../actions/notification.js';

let mainDiv = document.querySelector('#site-content');

export function createPage() {
    render(createTemplate(), mainDiv);
}

export async function createMeme(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#create-form');

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    if (title == '' || description == '' || imageUrl == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        const response = await fetch('http://localhost:3030/data/memes', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, imageUrl})
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(data.message);
        }

        form.reset();
        updateNavigation();
        page.redirect('/all-memes');

    } catch (error) {
        alert(error.message);
    }
}