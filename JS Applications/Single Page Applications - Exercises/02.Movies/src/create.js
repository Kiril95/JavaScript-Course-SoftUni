import { showHomePage } from './home.js';
import { showSection } from './dom.js';

const addForm = document.querySelector('#add-movie > form');

const addSection = document.querySelector('#add-movie');
addSection.remove();

export function showAddMovieSection() {
    showSection(addSection);
}

addForm.addEventListener('submit', addMovie)

export async function addMovie(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');
    
    if (title == '' || description == '' || img == '') {
        return alert('Please fill the required fields!');
    }

    try {
        const response = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, img })
        });

        if (!response.ok || response.status != 200) {
            addForm.reset();
            const data = await response.json();
            throw new Error(data.message);
        }

        addForm.reset();
        showHomePage();

    } catch (error) {
        alert(error.message);
    }
}