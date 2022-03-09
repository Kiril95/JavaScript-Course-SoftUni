import { render } from '../../node_modules/lit-html/lit-html.js';
import { userDetailsTemplate, guestDetailsTemplate } from '../../templates/detailsTemplate.js';

export async function showDetails(ctx) {
    let main = document.querySelector('#views');
    let targetId = ctx.params.id;
 
    try {
        const response = await fetch(`http://localhost:3030/data/teams/${targetId}`);
        let data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        const members = await getMembers(targetId);
        data.membersCount = members.length;

        if (sessionStorage.getItem('authToken')) {
            render(userDetailsTemplate(data, members), main);
        } else {
            render(guestDetailsTemplate(data, members), main);
        }

    } catch (error) {
        alert(error.message);
    }
}

export async function getMembers(id) {
    const response = await fetch(`http://localhost:3030/data/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`);
    return await response.json();
}