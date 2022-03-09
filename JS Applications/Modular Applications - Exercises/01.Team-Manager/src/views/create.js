import page from '../../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { loadTeams } from '../views/teams.js';
import { updateNavigation } from '../navigation.js';
import { createTemplate } from '../../templates/createTemplate.js';

let main = document.querySelector('#views');

export function createPage() {
    render(createTemplate(), main);
}

export async function createTeam(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = document.querySelector('#create-form');

    let name = formData.get('name');
    let logoUrl = formData.get('logoUrl');
    let description = formData.get('description');
    
    if (name == '' || logoUrl == '' || description == '') {
        alert('Please fill the required fields!');
    }
    
    try {
        if (name.length < 4) {
            throw new Error('The name must be at least 4 characters long!');
        }
        if (description.length < 10) {
            throw new Error('The description must be at least 10 characters long!');
        }

        const response = await fetch('http://localhost:3030/data/teams', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, logoUrl, description})
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        
        form.reset();
        updateNavigation();
        loadTeams();
        page.redirect('/teams');

    } catch (error) {
        render(createTemplate(error.message), main);
    }
}