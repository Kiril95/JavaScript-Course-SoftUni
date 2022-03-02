import { loadBooks } from './display.js';

export async function createBook(event) {
    event.preventDefault();
    
    let dataForm = new FormData(event.currentTarget)
    const form = document.querySelector('form');
    let title = dataForm.get('title');
    let author = dataForm.get('author');

    if (title == '' || author == '') {
        alert('Please fill the required fields!');
        return;
    }

    await fetch(`http://localhost:3030/jsonstore/collections/books/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
    })

    form.reset();
    loadBooks()
}