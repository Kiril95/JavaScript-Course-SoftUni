import { html } from '../node_modules/lit-html/lit-html.js';

export let profileTemplate = (data) => {
    let username = sessionStorage.getItem('username');
    let email = sessionStorage.getItem('userEmail');
    let sex = sessionStorage.getItem('sex');

    return html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${sex}.png">
            <div class="user-content">
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
                <p>My memes count: ${data.length}</p>
            </div>
        </article>

        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${data.length > 0 ? html `${data.map(info => html `
            <div class="user-meme">
                <p class="user-meme-title">${info.title}</p>
                <img class="userProfileImage" alt="meme-img" src="${info.imageUrl}">
                <a class="button" href="/details/${info._id}">Details</a>
            </div>`)}`
        
            : html `<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>
`;}