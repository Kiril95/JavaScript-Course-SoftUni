import { render } from '../../node_modules/lit-html/lit-html.js';
import { teamsTemp } from '../../templates/teamsTemplate.js';

export async function loadTeams() {
    let main = document.querySelector('#views');

    try {
        const response = await fetch(`http://localhost:3030/data/teams`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        const members = await getMembers(data.map(x => x._id)); // Get the members of the specific team
        data.forEach(t => t.membersCount = members.filter(m => m.teamId == t._id).length);

        render(teamsTemp(Object.values(data)), main);

    } catch (error) {
        alert(error.message);
    }
}

export async function getMembers(teamIds) {
    const query = encodeURIComponent(`teamId IN ("${teamIds.join('", "')}") AND status="member"`);
    const response = await fetch(`http://localhost:3030/data/members?where=${query}`);
    return await response.json();
}