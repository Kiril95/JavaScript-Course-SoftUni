function addItem() {
    let dropdownMenu = document.querySelector('#menu');
    let textField = document.querySelector('#newItemText');
    let valueField = document.querySelector('#newItemValue');

    let optionElement = document.createElement('option');
    optionElement.text = textField.value;
    optionElement.value = valueField.value;
    dropdownMenu.appendChild(optionElement);

    textField.value = '';
    valueField.value = '';
}