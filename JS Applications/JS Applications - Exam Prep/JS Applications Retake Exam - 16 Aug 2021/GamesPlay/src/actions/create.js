import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { createTemplate } from '../../templates/createTemplate.js';

let mainDiv = document.querySelector('#site-content');

export function createPage() {
    render(createTemplate(), mainDiv);
}

export async function createGame(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#create');

    let title = formData.get('title');
    let category = formData.get('category');
    let maxLevel = formData.get('maxLevel');
    let imageUrl = formData.get('imageUrl');
    let summary = formData.get('summary');
    
    if (title == '' || category == '' || maxLevel == '' || imageUrl == '' || summary == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        const response = await fetch('http://localhost:3030/data/games', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, category, maxLevel, imageUrl, summary})
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