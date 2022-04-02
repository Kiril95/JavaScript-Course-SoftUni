import page from '../../node_modules/page/page.mjs';

export async function donate(ctx) {
    let targetId = ctx.params.id;

    await fetch(`http://localhost:3030/data/donation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        },
        body: JSON.stringify({ petId: targetId })
    })

    page.redirect(`/details/${targetId}`);
}

export async function hasUserDonated(targetId) {
    const userId = sessionStorage.getItem('userId');

    const response = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${targetId}%22%20and%20_ownerId%3D%22${userId}%22&count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}

export async function getDonationsForPet(targetId) {
    const response = await fetch(`http://localhost:3030/data/donation?where=petId%3D%22${targetId}%22&distinct=_ownerId&count`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await response.json();
}