import { loadBooks } from './display.js';

export async function deleteBook(event) {
    let targetId = event.target.parentNode.parentNode.getAttribute('id');

    await fetch(`http://localhost:3030/jsonstore/collections/books/${targetId}`, {
        method: 'DELETE'
    });

    loadBooks();
}