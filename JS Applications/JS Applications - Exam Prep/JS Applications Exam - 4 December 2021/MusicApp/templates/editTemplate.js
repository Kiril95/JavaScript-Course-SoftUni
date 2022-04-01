import { html } from '../node_modules/lit-html/lit-html.js';
import { editAlbum } from '../src/actions/edit.js';

export let editTemplate = (item) => {
    return html`
    <section class="editPage">
        <form data-id="${item._id}" id="edit-page" @submit=${editAlbum}>
            <fieldset>
                <legend>Edit Album</legend>
    
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" value="${item.name}">
    
                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${item.imgUrl}">
    
                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" value="${item.price}">
    
                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${item.releaseDate}">
    
                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" value="${item.artist}">
    
                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" value="${item.genre}">
    
                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10"cols="10">${item.description}</textarea>
    
                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>
`;}