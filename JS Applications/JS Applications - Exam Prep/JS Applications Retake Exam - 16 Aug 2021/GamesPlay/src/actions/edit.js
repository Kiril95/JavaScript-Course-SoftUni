import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { editTemplate } from '../../templates/editTemplate.js';

let mainDiv = document.querySelector('#site-content');

export async function editPage(ctx) {
    let targetId = ctx.params.id;

    const response = await fetch(`http://localhost:3030/data/games/${targetId}`);
    const data = await response.json();
    
    window.scrollTo(0, 0);
    render(editTemplate(data), mainDiv);
}

export async function editGame(event) {
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');

    const formData = new FormData(event.target);
    const form = document.querySelector('#edit');

    let title = formData.get('title');
    let category = formData.get('category');
    let maxLevel = formData.get('maxLevel');
    let imageUrl = formData.get('imageUrl');
    let summary = formData.get('summary');
    
    if (title == '' || category == '' || maxLevel == '' || imageUrl == '' || summary == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        let response = await fetch(`http://localhost:3030/data/games/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, category, maxLevel, imageUrl, summary})
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