import page from '../../node_modules/page/page.mjs';

export async function deleteGame(ctx) {
    let targetId = ctx.params.id;
    const confirmed = confirm(`Are you sure you want to delete this game ?`);
    
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3030/data/games/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            page.redirect('/');

        } catch (error) {
            page.redirect(`/details/${targetId}`);
            alert(error.message);
        }
    }
}