import { html } from 'https://unpkg.com/lit-html?module';
import { loadBooks } from '../src/display.js';
import { deleteBook } from '../src/delete.js';
import { editBook, viewForm } from '../src/edit.js';
import { createBook } from '../src/create.js';

export let templateBody = () => html`
    <body>
        <button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    
            </tbody>
        </table>
    </body>
`;

export let templateRow = (data) => {
    return html`
    ${Object.entries(data).map(([_, info]) => html
    `<tr id="${info[0]}">
        <td>${info[1].title}</td>
        <td>${info[1].author}</td>
        <td>
            <button @click=${viewForm}>Edit</button>
            <button @click=${deleteBook}>Delete</button>
        </td>
    </tr>`)}
`;}

export let templateAdd = () => html`
    <form @submit=${createBook} id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

export let templateEdit = () => html`
    <form @submit=${editBook} id="edit-form" style="display: none">
        <input type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;