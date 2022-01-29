function solve(area, vol, input) {
    let parsed = JSON.parse(input);
    let resultArr = [];

    for (const info of parsed) {
        let currentObj = {
            area: area.call(info),
            volume: vol.call(info)
        };
        resultArr.push(currentObj);
    }
    
    return resultArr;
}

function area() {
    return Math.abs(this.x * this.y);
};

function vol() {
    return Math.abs(this.x * this.y * this.z);
};

solve(area, vol, `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`);