import { loadBooks } from './display.js';

let targetId;

export async function viewForm(event) {
    event.preventDefault();
    targetId = event.target.parentNode.parentNode.getAttribute('id');

    document.querySelector('#add-form').style.display = 'none';
    document.querySelector('#edit-form').style.display = 'block';

    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${targetId}`);
    const data = await response.json();

    let currTitle = document.querySelector('#edit-form :nth-of-type(2)');
    let currAuthor = document.querySelector('#edit-form :nth-of-type(3)');
    
    currTitle.value = data.title;
    currAuthor.value = data.author;
}

export async function editBook(event) {
    event.preventDefault();

    let dataForm = new FormData(event.currentTarget)
    let title = dataForm.get('title');
    let author = dataForm.get('author');

    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/books/${targetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        document.querySelector('#add-form').style.display = 'block';
        document.querySelector('#edit-form').style.display = 'none';
        loadBooks();

    } catch (error) {
        alert(error.message);
    }
}