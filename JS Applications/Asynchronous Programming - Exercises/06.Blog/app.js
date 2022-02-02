function attachEvents() {
    let postsButton = document.querySelector('#btnLoadPosts');
    let viewPostButton = document.querySelector('#btnViewPost');
    let dropDownMenu = document.querySelector('#posts');

    postsButton.addEventListener('click', createPosts);
    viewPostButton.addEventListener('click', generateInformation);

    async function createPosts() {
        try {
            const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
    
            if (!response.ok || response.status != 200) {
                throw new Error('Invalid request');
            }
            const data = await response.json();

            Object.values(data).forEach(info => {    
                let optionElement = createElement('option', info.id, info.title, dropDownMenu);
            });
    
        } catch (error) {
            alert(error.message);
        }
    }
    
    async function generateInformation() {
        let titleHeader = document.querySelector('#post-title');
        let contentList = document.querySelector('#post-body');
        let commentSection = document.querySelector('#post-comments');
        let targetId = dropDownMenu.value;

        try {
            // View the main information for the selected post
            const response = await fetch(`http://localhost:3030/jsonstore/blog/posts/${targetId}`);
    
            if (!response.ok || response.status != 200) {
                throw new Error('Invalid request');
            }
            const data = await response.json();

            titleHeader.textContent = data.title;
            contentList.textContent = data.body;
    
        } catch (error) {
            alert(error.message);
        }

        try {
            // View the comments for the selected post
            const response = await fetch(`http://localhost:3030/jsonstore/blog/comments`);

            if (!response.ok || response.status != 200) {
                throw new Error('Invalid request');
            }
            const data = await response.json();

            commentSection.replaceChildren(); // Clear
            Object.values(data).forEach(info => {
                if (info.postId == targetId) {
                    let listElement = createElement('li', undefined, info.text, commentSection);
                    listElement.id = info.id;
                }
            })

        } catch (error) {
            alert(error.message);
        }
    }
}

function createElement(element, value, textCon, parent) {
    const elem = document.createElement(element);

    if (value) {
        elem.value = value;
    }
    if (textCon) {
        elem.textContent = textCon;
    }
    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}

attachEvents();