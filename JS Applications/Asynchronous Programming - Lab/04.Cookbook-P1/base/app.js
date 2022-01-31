window.addEventListener('load', () => {
    recipes();
});

async function recipes() {
    const main = document.querySelector('main');

    try {
        const url = 'http://localhost:3030/jsonstore/cookbook/recipes';  // The overview of the recipe (Title, Img)
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(`Error ${response.status}!`);
        }

        document.querySelector('main > p').remove();  // Removes 'Loading...'

        Object.values(data)
            .map(info => {
                const articleElement = createElement('article', undefined, 'preview', main);

                const divElement = createElement('div', undefined, 'title', articleElement);
                const h2Element = createElement('h2', info.name, undefined, divElement);
                const div2Element = createElement('div', undefined, 'small', articleElement);
                const imgElement = createElement('img', undefined, undefined, div2Element);

                imgElement.setAttribute('src', info.img);

                articleElement.addEventListener('click', () => generateRecipe(info._id, articleElement)); // Click on a recipe
            });

    } catch (error) {
        alert(error.message);
    }
}

async function generateRecipe(id, targetRecipe) {
    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`; // Inside the recipe, depending on the :id

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(`Error ${response.status}!`);
        }

        const articleElement = createElement('article');

        const h2Element = createElement('h2', data.name, undefined, articleElement);

        const divElement = createElement('div', undefined, 'band', articleElement);
        const div2Element = createElement('div', undefined, 'thumb', divElement);

        const imgElement = createElement('img', undefined, undefined, div2Element);
        imgElement.setAttribute('src', data.img);

        const div3Element = createElement('div', undefined, 'ingredients', divElement);
        const h3Element = createElement('h3', 'Ingredients', undefined, div3Element);

        const ulElement = createElement('ul', undefined, undefined, div3Element);

        Object.values(data.ingredients)   // Traverse through the given array
            .map(ingredient => {
                const li = createElement('li', ingredient, undefined, ulElement)
            });

        const div4Element = createElement('div', undefined, 'description', articleElement);
        const h3PreparationElement = createElement('h3', 'Preparation', undefined, div4Element);

        Object.values(data.steps)
            .map(step => {
                createElement('p', step, undefined, div4Element)
            });

        targetRecipe.replaceWith(articleElement);  // Replaces an Element with another

    } catch (error) {
        alert(error.message);
    }
}

function createElement(type, textCon, className, parent) {
    const element = document.createElement(type);

    if (textCon) {
        element.textContent = textCon;
    }
    if (className) {
        element.className = className;
    }
    if (parent) {
        parent.appendChild(element);
    }

    return element;
}