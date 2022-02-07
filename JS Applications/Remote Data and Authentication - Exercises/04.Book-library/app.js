const baseUrl = `http://localhost:3030/jsonstore/collections/books/`;
const form = document.querySelector('form');
let targetId = '';

function attachEvents() {
    let loadBtn = document.querySelector('#loadBooks');

    loadBtn.addEventListener('click', loadBooks);
    form.addEventListener('submit', createOrSave);
}

async function loadBooks() {
    const tableBody = document.querySelector('tbody');
    tableBody.replaceChildren();  // Remove the previous loaded books, so they don't stack

    try {
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.entries(data).forEach(([key, info]) => {
            let tableRow = createElement('tr', undefined, tableBody);
            tableRow.setAttribute('id', key); // Set it on the row for future operations
            let titleTD = createElement('td', info.title, tableRow);
            let authorTD = createElement('td', info.author, tableRow);

            let buttonsTD = createElement('td', undefined, tableRow);
            let editBtn = createElement('button', 'Edit', buttonsTD);
            let deleteBtn = createElement('button', 'Delete', buttonsTD);

            tableBody.appendChild(tableRow);

            editBtn.addEventListener('click', editForm); // EDIT
            deleteBtn.addEventListener('click', deleteBook); // DELETE
        });

    } catch (error) {
        alert(error.message);
    }
}

async function editForm(event) {
    // Bring out the information of the book that we want to edit
    event.preventDefault();
    targetId = event.target.parentNode.parentNode.getAttribute('id');

    const response = await fetch(`${baseUrl}${targetId}`);
    const data = await response.json();

    document.querySelector('form > h3').textContent = 'Edit Form';
    document.querySelector('form button').textContent = 'Save';

    let currTitle = document.getElementsByName('title')[0];
    let currAuthor = document.getElementsByName('author')[0];

    currTitle.value = data.title;
    currAuthor.value = data.author;
}

async function createOrSave(event) {
    event.preventDefault();

    let dataForm = new FormData(event.currentTarget)
    let title = dataForm.get('title');
    let author = dataForm.get('author');

    let h3Element = document.querySelector('form > h3');
    let btnElement = document.querySelector('form button');

    if (btnElement.textContent == 'Save') {
        // Save edited content
        await fetch(`${baseUrl}${targetId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })

        h3Element.textContent = 'FORM';
        btnElement.textContent = 'Submit';

    } else {
        if (title == '' || author == '') {
            alert('Please fill the required fields!');
            return;
        }
        
        // Submit new book
        await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })
    }

    // Clear the form either way
    form.reset();
    loadBooks()
}

async function deleteBook(event) {
    let targetId = event.target.parentNode.parentNode.getAttribute('id');

    await fetch(`${baseUrl}${targetId}`, {
        method: 'DELETE'
    });

    loadBooks();
}

function createElement(element, textCon, parent) {
    const elem = document.createElement(element);

    if (textCon) {
        elem.textContent = textCon;
    }
    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}

attachEvents();