const main = document.querySelector('main');

// The backbone of everything
export function showSection(section) {
    main.replaceChildren(section);
}

export function createElement(type, textCon, className, parent) {
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