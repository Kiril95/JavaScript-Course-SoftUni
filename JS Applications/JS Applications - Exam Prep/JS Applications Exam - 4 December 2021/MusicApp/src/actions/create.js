import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { updateNavigation } from './../navigation.js';
import { createTemplate } from '../../templates/createTemplate.js';

let mainDiv = document.querySelector('#site-content');

export function createPage() {
    render(createTemplate(), mainDiv);
}

export async function createAlbum(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#create-page');

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
        const response = await fetch('http://localhost:3030/data/albums', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, imgUrl, price, releaseDate, artist, genre, description })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            form.reset();
            throw new Error(data.message);
        }

        form.reset();
        updateNavigation();
        page.redirect('/catalog');

    } catch (error) {
        alert(error.message);
    }
}