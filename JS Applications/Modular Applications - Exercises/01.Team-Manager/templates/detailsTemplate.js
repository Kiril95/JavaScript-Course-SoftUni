import { html } from '../node_modules/lit-html/lit-html.js';

let isLoggedIn = sessionStorage.getItem('authToken');
let myUsername = sessionStorage.getItem('username');

export let userDetailsTemplate = (team, members) => {
    let isOwner = team._ownerId == sessionStorage.getItem('userId');
    let isMember = checkMembership(members);

    console.log(team);
    return html`
    <section id="team-home">
        <article class="layout">
            <img src=${team.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${team.membersCount} ${team.membersCount == 1 ? 'Member' : 'Members'}</span>
                <div>
                ${isOwner ? html`
                    <a href="#" class="action">Edit team</a>` : ''}
                ${isMember ? html`
                    <a data-id="${team._id}" href="javascript:void(0)" class="action">Join team</a>` : 
                html `<a href="#" class="action invert">Leave team</a>`}
                
                Membership pending. <a href="#">Cancel request</a>
                </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    <li>${members.map(user => memberTemp(user))}</li>
                </ul>
            </div>
            ${isOwner ? html`
            <div class="pad-large">
                <h3>Membership Requests</h3>
                <ul class="tm-members">
                    <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                            class="tm-control action">Decline</a></li>
                    <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                            class="tm-control action">Decline</a></li>
                </ul>
            </div>` : ''}
    
        </article>
    </section>
`;}

export let guestDetailsTemplate = (team, members) => {
    
    return html`
    <section id="team-home">
        <article class="layout">
            <img src=${team.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${team.name}</h2>
                <p>${team.description}</p>
                <span class="details">${team.membersCount} ${team.membersCount == 1 ? 'Member' : 'Members'}</span>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    <li>${members.map(user => memberTemp(user))}</li>
                </ul>
            </div>
    
        </article>
    </section>
`;}

export let memberTemp = (member) => {
    let isMember = member.user.username == myUsername;

    return html`
    <li>${member.user.username} ${isMember && isLoggedIn ? html`<a href="#" class="tm-control action">Remove from team</a>` : ''}</li>
`;}

function checkMembership(members){
    let isMember = true;

    Object.values(members).forEach(member => {
        if (member.user.username == myUsername) {
            isMember = false;
        }
    })

    return isMember;
}