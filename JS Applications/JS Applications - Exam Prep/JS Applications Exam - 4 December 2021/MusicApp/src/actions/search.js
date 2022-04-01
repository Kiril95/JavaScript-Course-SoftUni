import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { searchTemplate, searchBoxTemplate } from '../../templates/searchTemplate.js';

let mainDiv = document.querySelector('#site-content');

export async function searchPage() {
    render(searchBoxTemplate(searchByName), mainDiv);

    async function searchByName(event) {
        event.preventDefault();
        let searchField = document.querySelector('#search-input');
        
        if (searchField.value) {
            const data = await getAlbum(searchField.value);

            render(searchTemplate(searchByName, data), mainDiv);
            //page.redirect(`/search?query=${encodeURIComponent(searchField.value)}`);
        } else {
            alert('Please type in a search word!');
        }
    }
}

export async function getAlbum(query) {
    const response = await fetch(`http://localhost:3030/data/albums?where=name%20LIKE%20%22${query}%22`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}