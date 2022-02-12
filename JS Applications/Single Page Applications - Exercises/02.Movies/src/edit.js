import { showHomePage } from './home.js';
import { showEditSection } from './details.js';

const editSection = document.querySelector('#edit-movie');

export async function handleForm(event) {
    // View the Edit section and put the targeted values in the fields to be ready for editing
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');
    showEditSection();

    const response = await fetch(`http://localhost:3030/data/movies/${targetId}`);
    const data = await response.json();

    editSection.querySelector('[name="title"]').value = data.title;
    editSection.querySelector('[name="description"]').value = data.description;
    editSection.querySelector('[name="imageUrl"]').value = data.img;

    let form = editSection.querySelector('#edit-movie > form');
    form.setAttribute('data-id', targetId);
    form.addEventListener('submit', editMovie);   // Save changes
}

async function editMovie(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let targetId = event.target.getAttribute('data-id');
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');
    
    try {
        const response = await fetch(`http://localhost:3030/data/movies/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, img })
        });

        if (!response.ok || response.status != 200) {
            let data = await response.json();
            throw new Error(data.message);
        }

        showHomePage();

    } catch (error) {
        showHomePage();
        alert(error.message);
    }
}