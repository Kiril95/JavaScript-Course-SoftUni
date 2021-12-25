function solve(inputArr = []){
    let resultObj = {};

    for (let i = 0; i < inputArr.length; i += 2) {
        resultObj[inputArr[i]] = Number(inputArr[i + 1]);
    }
    
    console.log(resultObj);
}

solve(['Yoghurt', '48', 'Rise', '138', 'Apple', '52'])