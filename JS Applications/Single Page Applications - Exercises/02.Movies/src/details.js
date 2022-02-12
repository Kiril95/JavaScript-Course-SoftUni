import { createElement, showSection } from './dom.js';
import { deleteMovie } from './delete.js';
import { handleForm } from './edit.js';
import { getLikes, haveYouLiked, likeMovie, removeLike } from './likes.js';

const movieSection = document.querySelector('#movie');

const detailsSection = document.querySelector('#movie-example');
const editSection = document.querySelector('#edit-movie');
//detailsSection.remove();
//editSection.remove();

export function showDetailsSection() {
    showSection(detailsSection);
}

export function showEditSection() {
    showSection(editSection);
}

export async function displayMovies() {
    movieSection.replaceChildren();

    try {
        const response = await fetch('http://localhost:3030/data/movies');
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        // Display only if logged in
        if (sessionStorage.getItem('authToken')) {
            let div1 = createElement('div', undefined, 'mt-3', movieSection);
            let div2 = createElement('div', undefined, 'row d-flex d-wrap', div1);
            let div3 = createElement('div', undefined, 'card-deck d-flex justify-content-center', div2);

            for (const info of data) {
                let div4 = createElement('div', undefined, 'card mb-4', div3);

                let imgElement = createElement('img', undefined, 'card-img-top', div4);
                imgElement.width = '400';
                imgElement.alt = 'Card image cap';
                imgElement.setAttribute('src', info.img);

                let titleDiv = createElement('div', undefined, 'card-body', div4);
                let h4Element = createElement('h4', info.title, 'card-title', titleDiv);

                let btnDiv = createElement('div', undefined, 'card-footer', div4);
                let anchorElement = createElement('a', undefined, undefined, btnDiv);
                anchorElement.setAttribute('href', '#');
                let detailsBtn = createElement('button', 'Details', 'btn btn-info', btnDiv);
                detailsBtn.type = 'button';
                detailsBtn.setAttribute('data-id', info._id);

                detailsBtn.addEventListener('click', showDetails); // Click on a movie
            }
        }

    } catch (error) {
        alert(error.message);
    }
}

async function showDetails(event) {
    event.preventDefault();
    showDetailsSection();
    detailsSection.replaceChildren();

    let targetId = event.target.getAttribute('data-id');

    try {
        const response = await fetch(`http://localhost:3030/data/movies/${targetId}`);
        const data = await response.json();
        const likesCount = await getLikes(targetId); // !
        const hasUserLiked = await haveYouLiked(targetId); // !

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        let containerDiv = createElement('div', undefined, 'container', detailsSection);
        let h1titleElement = createElement('h1', `${data.title}`, undefined, containerDiv);

        let div2 = createElement('div', undefined, 'row bg-light text-dark', containerDiv);

        let imageDiv = createElement('div', undefined, 'col-md-8 ', div2);
        let imgElement = createElement('img', undefined, 'img-thumbnail', imageDiv);
        imgElement.alt = 'Movie';
        imgElement.setAttribute('src', data.img);

        let descriptionDiv = createElement('div', undefined, 'col-md-4 text-center', div2);
        let h3Element = createElement('h3', `Movie Description`, 'my-3', descriptionDiv);
        let paragraphElement = createElement('p', data.description, undefined, descriptionDiv)

        // Check if the clicked movie is ours
        let userId = sessionStorage.getItem('userId');
        if (userId) {
            if (userId == data._ownerId) {
                let deleteAnchor = createElement('a', 'Delete', 'btn btn-danger', descriptionDiv);
                deleteAnchor.setAttribute('href', '#');
                deleteAnchor.setAttribute('data-id', targetId);

                let editAnchor = createElement('a', 'Edit', 'btn btn-warning', descriptionDiv);
                editAnchor.setAttribute('href', '#');
                editAnchor.setAttribute('data-id', targetId);

                deleteAnchor.addEventListener('click', deleteMovie); // DELETE
                editAnchor.addEventListener('click', handleForm); // EDIT

            } else {
                let likeAnchor;

                if (hasUserLiked.length > 0) {
                    likeAnchor = createElement('a', 'Unlike', 'btn btn-primary', descriptionDiv);
                    likeAnchor.setAttribute('href', '#');
                    likeAnchor.style.backgroundColor = 'red';
                    
                    likeAnchor.addEventListener('click', () => removeLike(hasUserLiked[0]._id)); // UNLIKE

                } else {
                    likeAnchor = createElement('a', 'Like', 'btn btn-primary', descriptionDiv);
                    likeAnchor.setAttribute('href', '#');

                    likeAnchor.addEventListener('click', () => likeMovie(targetId)); // LIKE
                }
            }
        }
        let likesSpan = createElement('span', ` Likes ${likesCount}`, 'enrolled-span', descriptionDiv);


    } catch (error) {
        alert(error.message);
    }
}