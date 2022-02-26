import { showHomePage } from '../views/home.js';
import { showSection } from '../src/dom.js';

const createSection = document.querySelector('#create-view');
const createForm = document.querySelector('#create');

export function showCreateSection() {
    showSection(createSection);
}

createForm.addEventListener('submit', createIdea)

export async function createIdea(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');
    
    if (title.length < 6) {
        return alert('Title must be at least 6 characters long!');
    }
    if (description.length < 10) {
        return alert('Description must be at least 10 characters long!');
    }
    if (img.length < 5) {
        return alert('Image URL must be at least 5 characters long!');
    }
    
    try {
        const response = await fetch('http://localhost:3030/data/ideas', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, img })
        });

        if (!response.ok || response.status != 200) {
            createForm.reset();
            const data = await response.json();
            throw new Error(data.message);
        }

        createForm.reset();
        showHomePage();

    } catch (error) {
        alert(error.message);
    }
}