const form = document.querySelector('form');

form.addEventListener('submit', createRecipe)

async function createRecipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData
        .get('ingredients')
        .split('\n')
        .map(x => x.trim())
        .filter(x => x != '');

    let steps = formData
        .get('steps')
        .split('\n')
        .map(x => x.trim())
        .filter(x => x != '');

    if (name == '' || img == '' || ingredients == '' || steps == '') {
        alert('Please fill the required fields!');
        return;
    }

    try {
        // Give authorization to the user with the specific token, that has logged in
        // Post a new recipe inside the JSON object
        const response = await fetch('http://localhost:3030/data/recipes', {
            method: 'post',
            headers: {
                'Content-type': 'aplication/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, img, ingredients, steps })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            let parse = JSON.parse(data); // Parse it back to an object so we can access the error message
            throw new Error(parse.message);
        }

        window.location.pathname = '/base/index.html';

    } catch (error) {
        alert(error.message);
    }
}