function solve() {
    let [authorField, titleField, categoryField, textField] = document.querySelectorAll('section form p :nth-child(2)');
    let archiveList = document.querySelector('.archive-section ol');
    let articlesSection = document.querySelector('main section');
    let createBtn = document.querySelector('button');

    createBtn.addEventListener('click', createPost);

    function createPost(event) {
        event.preventDefault();

        let articleEl = createElement('article', '', '', articlesSection);

        let h1El = createElement('h1', titleField.value, '', articleEl);

        let para1El = createElement('p', 'Category: ', '', articleEl);
        let strong1El = createElement('strong', categoryField.value, '', para1El);

        let para2El = createElement('p', 'Creator: ', '', articleEl);
        let strong2El = createElement('strong', authorField.value, '', para2El);

        let para3El = createElement('p', textField.value, '', articleEl);

        let btnsDiv = createElement('div', '', 'buttons', articleEl);
        let deleteBtn = createElement('button', 'Delete', 'btn delete', btnsDiv);
        let archiveBtn = createElement('button', 'Archive', 'btn archive', btnsDiv);

        deleteBtn.addEventListener('click', deletePost);
        archiveBtn.addEventListener('click', archivePost);

        Array.from(document.querySelectorAll('section form p :nth-child(2)')).forEach(field => {
            field.value = '';
        });
    }

    function archivePost(event) {
        let currentTitle = event.target.parentNode.parentNode.querySelector('article > h1');

        let listEl = createElement('li', currentTitle.textContent, '', archiveList);

        Array.from(archiveList.querySelectorAll('li'))
            .sort((x, y) => x.textContent.localeCompare(y.textContent))
            .forEach(x => {
                archiveList.appendChild(x);
            });

        event.target.parentNode.parentNode.remove();
    }

    function deletePost(event) {
        event.target.parentNode.parentNode.remove();
    }

    function createElement(type, textCon, classList, parent) {
        const element = document.createElement(type);

        if (textCon) {
            element.textContent = textCon;
        }
        if (classList) {
            element.classList = classList;
        }
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }
}