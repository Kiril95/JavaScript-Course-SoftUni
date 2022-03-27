import { html } from '../node_modules/lit-html/lit-html.js';
import { createMeme } from '../src/actions/create.js';

export const createTemplate = () => {
    return html`
    <section id="create-meme">
        <form id="create-form" @submit=${createMeme}>
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
`;}