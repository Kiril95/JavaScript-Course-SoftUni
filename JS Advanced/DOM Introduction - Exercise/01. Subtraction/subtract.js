function subtract() {
    let first = document.querySelector('#firstNumber');
    let second = document.querySelector('#secondNumber');
    first.disabled = false;
    second.disabled = false;
    let getResultField = document.querySelector('#result');

    getResultField.textContent = Number(first.value) - Number(second.value);
}