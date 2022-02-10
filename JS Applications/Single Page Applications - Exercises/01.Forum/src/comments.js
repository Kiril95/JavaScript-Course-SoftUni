import { createElement } from './dom.js';

const main = document.querySelector('main');

export async function displayComments() {
    const commentsDiv = document.querySelector('.comment');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info => {
            let usersDiv = createElement('div', undefined, 'user-comment', commentsDiv);
            let headerDiv = createElement('div', undefined, 'header', usersDiv);

            let imgElement = createElement('img', undefined, undefined, headerDiv);
            imgElement.setAttribute('src', './static/profile.png');
            imgElement.alt = 'avatar';

            let p1Element = createElement('p', undefined, undefined, headerDiv);
            let spanElement = createElement('strong', `${info.username} commented on `, undefined, p1Element);
            let timeElement = createElement('time', info.time, undefined, p1Element);

            let p2Element = createElement('p', info.postText, 'post-content', headerDiv);
        });

    } catch (error) {
        alert(error.message);
    }
}

export function viewCommentBox() {
    let mainDiv = createElement('div', undefined, 'answer-comment', main);
    let p1Element = createElement('p', undefined, undefined, mainDiv);
    let spanElement = createElement('span', 'CurrentUser  comment:', undefined, p1Element);

    let textDiv = createElement('div', undefined, 'answer', mainDiv);
    let form = createElement('form', undefined, undefined, textDiv);
    let textarea = createElement('textarea', undefined, undefined, form);
    textarea.name = 'postText';
    textarea.cols = '30';
    textarea.rows = '10';

    let infoDiv = createElement('div', undefined, undefined, form);
    let labelElement = createElement('label', 'Username * ', 'red', infoDiv);
    let inputElement = createElement('input', undefined, undefined, infoDiv);
    inputElement.type = 'text';
    inputElement.name = 'username';

    let postBtn = createElement('button', 'Post', undefined, form);

    form.addEventListener('submit', postComment);
}

async function postComment(event) {
    event.preventDefault();
    let form = new FormData(event.target);
    let commentForm = document.querySelector('.answer form');

    let username = form.get('username');
    let postText = form.get('postText');
    let time = new Date().toLocaleString();

    if (username == '' || postText == '') {
        return alert('Please fill the required fields!');
    }

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
            },
            body: JSON.stringify({ username, postText, time })
        });

        if (!response.ok || response.status != 200) {
            const data = await response.json();
            throw new Error(data.message);
        }

    } catch (error) {
        commentForm.reset();
        alert(error.message);
    }

    displayComments();
    commentForm.reset();
}