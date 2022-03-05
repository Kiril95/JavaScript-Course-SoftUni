import { html } from '../node_modules/lit-html/lit-html.js';
import { deleteItem } from '../src/actions/delete.js';

export let detailsTemplate = (item) => {
    let isOwner = item._ownerId == sessionStorage.getItem('userId');
    
    return html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img.replace('./', '/')}/>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
            ${isOwner ? html`
            <div>
                <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
                <a data-id="${item._id}" @click=${e => deleteItem(e)} href="javascript:void(0)" class="btn btn-red">Delete</a>
            </div>` : ''}
        </div>
    </div>
`;}