function solution(inputArr = []) {
    let obj = {};

    let operations = {
        create: function (key) {
            Object.create(obj[key] = {})
        },
        inherit: function (key, parent) {
            Object.create(obj[key] = {})
            Object.setPrototypeOf(obj[key], obj[parent]);
        },
        set: function (name, key, value) {
            obj[name][key] = value;
        },
        print: function (name) {
            let arr = [];
            for (const key in obj[name]) {
                arr.push(`${key}:${obj[name][key]}`);
            }
            console.log(arr.join(','));
        },
    };

    for (const info of inputArr) {
        let split = info.split(" ");
        let command = split[0];
        let name = split[1];

        if (command === 'create' && split.length == 2) {
            operations.create(name);
        }
        else if (split[2] === 'inherit') {
            let parent = split[3];
            operations.inherit(name, parent);
        }
        else if (command === 'set') {
            let key = split[2];
            let value = split[3];
            operations.set(name, key, value);
        }
        else {
            operations.print(name);
        }
    }
}

solution(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'])