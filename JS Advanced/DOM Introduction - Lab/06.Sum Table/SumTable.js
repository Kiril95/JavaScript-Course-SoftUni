function sumTable() {
    let getTableRows = document.querySelectorAll('table tbody tr td'); 
    let getSumField = document.querySelector('#sum');  // table tbody tr:nth-child(5)
    let sum = 0;

    for (let i = 0; i < getTableRows.length - 1; i++) {
        if (parseInt(getTableRows[i].textContent)) {
            sum += Number(getTableRows[i].textContent);
        }
    }

    getSumField.textContent = sum;
}