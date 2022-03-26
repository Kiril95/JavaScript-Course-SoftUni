import page from '../../node_modules/page/page.mjs';

export async function getComments(targetId) {
    const response = await fetch(`http://localhost:3030/data/comments?where=gameId%3D%22${targetId}%22`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}

export async function comment(event) {
    event.preventDefault();
    let targetId = event.target.getAttribute('data-id');

    const formData = new FormData(event.target);
    const form = document.querySelector('#comm-section');

    let message = formData.get('comment');

    if (message == '') {
        return alert('Please write a comment!');
    }

    await fetch(`http://localhost:3030/data/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
        body: JSON.stringify({ gameId: targetId, comment: message })
    })

    form.reset();
    page.redirect(`/details/${targetId}`);
}