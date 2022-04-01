import page from '../../node_modules/page/page.mjs';

export async function deleteAlbum(ctx) {
    let targetId = ctx.params.id;
    const confirmed = confirm(`Are you sure you want to delete this album ?`);
    
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3030/data/albums/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            page.redirect('/catalog');

        } catch (error) {
            page.redirect(`/details/${targetId}`);
            alert(error.message);
        }
    }
}