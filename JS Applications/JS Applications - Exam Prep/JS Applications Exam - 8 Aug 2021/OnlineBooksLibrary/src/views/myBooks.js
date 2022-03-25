import { render } from '../../node_modules/lit-html/lit-html.js';
import { booksTemp } from '../../templates/myBooksTemplate.js';

export async function showUserBooks() {
    let mainDiv = document.querySelector('#site-content');
    let userId = sessionStorage.getItem('userId');

    try {
        const response = await fetch(`http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        console.log(data);
        render(booksTemp(Object.values(data)), mainDiv);

    } catch (error) {
        alert(error.message);
    }
}