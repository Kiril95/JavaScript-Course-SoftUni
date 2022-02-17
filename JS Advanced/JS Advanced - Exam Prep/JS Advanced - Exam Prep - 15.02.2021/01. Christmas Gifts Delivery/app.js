function solution() {
    let addBtn = document.querySelector('.card button');
    let nameField = document.querySelector('.card div > input');
    let [_, __, listGifts, sentGifts, discardedGifts] = document.querySelectorAll('.card :nth-child(2)');

    addBtn.addEventListener('click', addGift)

    function addGift() {
        let listElement = createElement('li', nameField.value, 'gift', listGifts);

        let sendBtn = createElement('button', 'Send', undefined, listElement);
        sendBtn.id = 'sendButton';
        let discardBtn = createElement('button', 'Discard', undefined, listElement);
        discardBtn.id = 'discardButton';

        sendBtn.addEventListener('click', moveGift); // Move
        discardBtn.addEventListener('click', removeGift); // Remove

        Array.from(listGifts.querySelectorAll('li'))
            .sort((x, y) => x.textContent.localeCompare(y.textContent))
            .forEach(x => {
                listGifts.appendChild(x);
            })

        nameField.value = '';
    }

    function moveGift(event) {
        let listElement = createElement('li', event.target.parentNode.firstChild.textContent, 'gift', sentGifts);
        event.target.parentNode.remove();
    }

    function removeGift(event) {
        let listElement = createElement('li', event.target.parentNode.firstChild.textContent, 'gift', discardedGifts);
        event.target.parentNode.remove();
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