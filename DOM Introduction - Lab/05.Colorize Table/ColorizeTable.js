function colorize() {
    let getTableRows = Array.from(document.querySelectorAll('table tr')); 

    for (let i = 1; i < getTableRows.length; i++) {
        if (i % 2 !== 0) {
            getTableRows[i].style.backgroundColor = 'Teal';
        }
    }
}