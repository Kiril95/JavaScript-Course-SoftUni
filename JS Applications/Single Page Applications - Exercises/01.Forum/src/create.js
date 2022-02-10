import { displayTopics } from './topics.js';

const form = document.querySelector('#postForm');

export async function createPost(event) {
    event.preventDefault();
    const formData = new FormData(event.target.parentNode.parentNode);

    let topicName = formData.get('topicName');
    let username = formData.get('username');
    let postText = formData.get('postText');
    let time = new Date().toLocaleString(); // Realtime date-time
    
    if (topicName == '' || username == '' || postText == '') {
        return alert('Please fill the required fields!');
    }

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
            },
            body: JSON.stringify({ topicName, username, postText, time })
        });

        if (!response.ok || response.status != 200) {
            const data = await response.json();
            throw new Error(data.message);
        }

        displayTopics();

    } catch (error) {
        form.reset();
        alert(error.message);
    }

    form.reset();
}

export async function cancelInputs(event) {
    event.preventDefault();
    form.reset();
}