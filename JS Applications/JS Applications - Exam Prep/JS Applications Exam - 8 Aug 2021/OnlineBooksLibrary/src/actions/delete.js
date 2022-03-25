import page from '../../node_modules/page/page.mjs';

export async function deleteBook(ctx) {
    let targetId = ctx.params.id;
    const confirmed = confirm(`Are you sure you want to delete this book ?`);
    
    if (confirmed) {
        try {
            const response = await fetch(`http://localhost:3030/data/books/${targetId}`, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': sessionStorage.getItem('authToken')
                }
            });

            if (response.status != 200) {
                const error = await response.json();
                throw new Error(error.message);
            }

            page.redirect('/dashboard');

        } catch (error) {
            page.redirect(`/details/${targetId}`);
            alert(error.message);
        }
    }
}