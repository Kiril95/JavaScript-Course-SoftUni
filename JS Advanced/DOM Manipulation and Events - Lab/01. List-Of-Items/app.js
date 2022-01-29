function addItem() {
    let inputField = document.querySelector('#newItemText');
    let listItems = document.querySelector('ul');

    let newElement = document.createElement('li');
    newElement.textContent = inputField.value;
    listItems.appendChild(newElement);
    inputField.value = '';
}