import { showDetails } from './details.js';

export async function getLikes(targetId) {
    const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${targetId}%22&distinct=_ownerId&count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json();
}

export async function haveYouLiked(targetId) {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');

    if (token) {
        const response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${targetId}%22%20and%20_ownerId%3D%22${userId}%22`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            }
        })
        return await response.json();
    }
}

export async function likeMovie(event, targetId) {
    await fetch(`http://localhost:3030/data/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
        body: JSON.stringify({ movieId: targetId })
    })

    showDetails(event);
}

export async function removeLike(event, likedID) {
    await fetch(`http://localhost:3030/data/likes/` + likedID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        }
    })

    showDetails(event);
}