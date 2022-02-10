import { createElement } from './dom.js';
import { displayComments, viewCommentBox } from './comments.js';

const main = document.querySelector('main');
const mainDiv = document.querySelector('.topic-container');

export async function displayTopics() {
    mainDiv.replaceChildren();

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info => {
            let wrapperDiv = createElement('div', undefined, 'topic-name-wrapper', mainDiv);
            let topicDiv = createElement('div', undefined, 'topic-name', wrapperDiv);

            let anchorElement = createElement('a', undefined, 'normal', topicDiv);
            anchorElement.setAttribute('href', '#');
            let h2Element = createElement('h2', info.topicName, undefined, anchorElement);
            h2Element.setAttribute('data-id', info._id);
            h2Element.style.textDecoration = 'underline';

            let infoDiv = createElement('div', undefined, 'columns', topicDiv);
            let p1Element = createElement('p', 'Date: ', undefined, infoDiv);
            let timeElement = createElement('time', info.time, undefined, p1Element);

            let userDiv = createElement('div', undefined, 'nick-name', infoDiv);
            let p2Element = createElement('p', 'Username: ', undefined, userDiv);
            let spanElement = createElement('time', info.username, undefined, p2Element);

            topicDiv.addEventListener('click', viewTopic);
        });

    } catch (error) {
        alert(error.message);
    }
}

async function viewTopic(event) {
    if (event.target.tagName == 'H2') {
        const targetId = event.target.getAttribute('data-id');
        main.replaceChildren()
        homepage.style.display = 'none';

        try {
            const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${targetId}`);
            const data = await response.json();

            if (response.status != 200) {
                throw new Error(error.message);
            }

            let h2Element = createElement('h2', data.topicName, undefined, main);

            let commentDiv = createElement('div', undefined, 'comment', main);
            let headerDiv = createElement('div', undefined, 'header', commentDiv);

            let imgElement = createElement('img', undefined, undefined, headerDiv);
            imgElement.setAttribute('src', './static/profile.png');
            imgElement.alt = 'avatar';

            let p1Element = createElement('p', undefined, undefined, headerDiv);
            let spanElement = createElement('span', `${data.username} posted on `, undefined, p1Element);
            let timeElement = createElement('time', data.time, undefined, p1Element);

            let p2Element = createElement('p', data.postText, 'post-content', headerDiv);

        } catch (error) {
            alert(error.message);
        }

        viewCommentBox();
        displayComments();
    }
}