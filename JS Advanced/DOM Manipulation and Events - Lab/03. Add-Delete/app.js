function addItem() {
    let inputField = document.querySelector('#newItemText');
    let listItems = document.querySelector('ul');

    let listElement = document.createElement('li');
    listElement.textContent = inputField.value;

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', '#');
    linkElement.textContent = "[Delete]";

    listElement.appendChild(linkElement);
    listItems.appendChild(listElement);

    linkElement.addEventListener('click', function(event){
        event.currentTarget.parentNode.remove();
    })

    inputField.value = '';
}