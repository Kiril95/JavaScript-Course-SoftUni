import { html } from '../node_modules/lit-html/lit-html.js';
import { editMeme } from '../src/actions/edit.js';

export let editTemplate = (item) => {
    return html`
    <section id="edit-meme">
        <form data-id="${item._id}" id="edit-form" @submit=${editMeme}>
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value="${item.title}">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">${item.description}</textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${item.imageUrl}">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;}