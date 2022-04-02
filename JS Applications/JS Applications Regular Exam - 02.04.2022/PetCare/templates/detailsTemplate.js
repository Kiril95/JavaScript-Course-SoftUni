import { html } from '../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (item, totalDonations, hasUserDonated) => {
    let isOwner = item._ownerId == sessionStorage.getItem('userId');
    let isLoggedIn = sessionStorage.getItem('authToken');
    
    return html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src="${item.image}">
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${item.name}</h1>
                    <h3>Breed: ${item.breed}</h3>
                    <h4>Age: ${item.age}</h4>
                    <h4>Weight: ${item.weight}</h4>
                    <h4 class="donation">Donation: ${totalDonations == 0 ? '0' : `${totalDonations * 100}$`}</h4>
                </div>

                ${isLoggedIn ? html `
                <!-- if there is no registered user, do not display div-->
                <div class="actionBtn">
                    ${isLoggedIn && isOwner ? html `
                    <!-- Only for registered user and creator of the pets-->
                    <a href="/edit/${item._id}" class="edit">Edit</a>
                    <a href="/delete/${item._id}" class="remove">Delete</a>` : ''}

                    ${!isOwner && isLoggedIn && hasUserDonated == 0 ? html `
                    <a href="/donate/${item._id}" class="donate">Donate</a>` : ''}
                </div>` : ''}
            </div>
        </div>
    </section>
`;}