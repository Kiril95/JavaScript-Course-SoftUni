async function solution() {
    const baseUrl = `http://localhost:3030/jsonstore/advanced/articles/list`;
    let mainSection = document.querySelector('#main');

    try {
        const response = await fetch(baseUrl);

        if (!response.ok || response.status != 200) {
            throw new Error('Invalid request');
        }

        const data = await response.json();

        Object.values(data).forEach(info => {
            let mainDiv = createElement('div', 'accordion', undefined, undefined, mainSection);

            let headDiv = createElement('div', 'head', undefined, undefined, mainDiv);
            let spanElement = createElement('span', undefined, info.title, undefined, headDiv);
            let buttonElement = createElement('button', 'button', 'More', info._id, headDiv);

            let extraDiv = createElement('div', 'extra', undefined, undefined, mainDiv);
            let paragraphElement = createElement('p', undefined, '', undefined, extraDiv);
        });

    } catch (error) {
        alert(error.message);
    }

    mainSection.addEventListener('click', expandSection);  // 'Listening' over the whole HTML file
}

async function expandSection(event) {
    // Get the ID of the clicked button and extract the needed data via a request
    // Make sure that the clicked element is a Button
    let button = event.target;

    if (button.tagName == 'BUTTON') {
        let id = button.getAttribute('id');
        let targetParagraph = button.parentNode.parentNode.querySelector('.extra > p');
        let targetDiv = button.parentNode.parentNode.querySelector('.extra');
        
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    
        try {
            const response = await fetch(url);

            if (!response.ok || response.status != 200) {
                throw new Error('Invalid request');
            }
            
            const data = await response.json();
    
            if (button.textContent === 'More') {
                button.textContent = 'Less';
                targetDiv.style.display = 'block';
                targetParagraph.textContent = data.content;  // Fill the paragraph
            } else {
                button.textContent = 'More';
                targetDiv.style.display = 'none';
            }
            
        } catch(error) {
            alert(error.message);
        }
    }
}

function createElement(element, className, textCon, id, parent) {
    const elem = document.createElement(element);

    if (className) {
        elem.className = className;
    }
    if (textCon) {
        elem.textContent = textCon;
    }
    if (id) {
        elem.id = id;
    }
    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}

solution();