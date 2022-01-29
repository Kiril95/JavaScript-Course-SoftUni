function solve() {
    let getSelectMenu = document.querySelector('#selectMenuTo');
    let getResultField = document.querySelector("#result");

    let binaryOperation = document.createElement('option');
    binaryOperation.textContent = 'Binary';
    binaryOperation.value = 'binary';

    let hexadecimalOperation = document.createElement('option');
    hexadecimalOperation.textContent = 'Hexadecimal';
    hexadecimalOperation.value = 'hexadecimal';

    getSelectMenu.appendChild(binaryOperation);
    getSelectMenu.appendChild(hexadecimalOperation);

    function convert() {
        let number = Number(document.querySelector("#input").value);
        let type = getSelectMenu.value;
        if (type === "binary") {
            getResultField.value = number.toString(2);
        }
        else if (type === "hexadecimal") {
            getResultField.value = number.toString(16).toUpperCase();
        }
    }

    document.querySelector("#container > button").addEventListener('click', convert);
}