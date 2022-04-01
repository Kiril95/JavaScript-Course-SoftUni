import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { editTemplate } from '../../templates/editTemplate.js';

let mainDiv = document.querySelector('#site-content');

export async function editPage(ctx) {
    let targetId = ctx.params.id;

    const response = await fetch(`http://localhost:3030/data/albums/${targetId}`);
    const data = await response.json();

    render(editTemplate(data), mainDiv);
}

export async function editAlbum(event) {
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');

    const formData = new FormData(event.target);
    const form = document.querySelector('#edit-page');

    let name = formData.get('name');
    let imgUrl = formData.get('imgUrl');
    let price = formData.get('price');
    let releaseDate = formData.get('releaseDate');
    let artist = formData.get('artist');
    let genre = formData.get('genre');
    let description = formData.get('description');

    if (name == '' || imgUrl == '' || price == '' || releaseDate == '' || artist == '' || genre == '' || description == '') {
        return alert('Please fill the required fields!');
    }
    
    try {
        let response = await fetch(`http://localhost:3030/data/albums/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, imgUrl, price, releaseDate, artist, genre, description })
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