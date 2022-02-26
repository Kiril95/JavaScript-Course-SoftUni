const main = document.querySelector('#views');

export function showSection(section) {
    main.replaceChildren(section);
}

export function createElement(type, textCon, classList, parent) {
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