import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { editTemplate } from '../../templates/editTemplate.js';
import { alert } from '../actions/notification.js';

let mainDiv = document.querySelector('#site-content');

export async function editPage(ctx) {
    let targetId = ctx.params.id;

    const response = await fetch(`http://localhost:3030/data/memes/${targetId}`);
    const data = await response.json();

    render(editTemplate(data), mainDiv);
}

export async function editMeme(event) {
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');

    const formData = new FormData(event.target);
    const form = document.querySelector('#edit-form');

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    if (title == '' || description == '' || imageUrl == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        let response = await fetch(`http://localhost:3030/data/memes/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, imageUrl})
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