function generateReport() {
    let getCheckboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    //let getTable = document.querySelectorAll('body > main > table');
    let getColumns = Array.from(document.querySelectorAll("tbody tr"));
    let getOutput = document.querySelector("#output");
    
    let result = [];
    for (let i = 0; i < getColumns.length; i++) {
        let info = {};

        for (let j = 0; j < getCheckboxes.length; j++) {
            
            if (getCheckboxes[j].checked) {
                let section = getCheckboxes[j].name;
                let text = getColumns[i].textContent.split("\n").map(x => x.trim()).filter(x => x !== "")[j];
                info[section] = text;
            }
        }

        result.push(info);
    }
    getOutput.value = JSON.stringify(result);
}