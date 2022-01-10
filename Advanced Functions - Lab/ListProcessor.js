function solution(inputArr = []) {
    let collection = [];
    let operations = {
        add: function (str) {
            collection.push(str);
        },
        remove: function (str) {
            collection = collection.filter(x => x !== str);
        },
        print: function () {
            console.log(collection.join(","));
        },
    };

    for (const info of inputArr) {
        let [command, str] = info.split(" ");
        operations[command](str);
    }
}

solution(['add hello', 'add again', 'remove hello', 'add again', 'print']);