import page from '../../node_modules/page/page.mjs';

export async function getLikes(targetId) {
    const response = await fetch(`http://localhost:3030/data/likes?where=bookId%3D%22${targetId}%22&distinct=_ownerId&count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}

export async function haveYouLiked(targetId) {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');

    if (token) {
        const response = await fetch(`http://localhost:3030/data/likes?where=bookId%3D%22${targetId}%22%20and%20_ownerId%3D%22${userId}%22&count`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            }
        })
        return await response.json();
    }
}

export async function likeBook(ctx) {
    let targetId = ctx.params.id;
    
    await fetch(`http://localhost:3030/data/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
        body: JSON.stringify({ bookId: targetId })
    })

    page.redirect(`/details/${targetId}`);
}