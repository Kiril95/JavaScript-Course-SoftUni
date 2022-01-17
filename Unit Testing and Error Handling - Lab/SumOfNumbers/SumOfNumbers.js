function sum(arr) {
    let sum = 0;
    for (let num of arr){
        sum += Number(num);
    }
    return sum;
}

//sum(([1, 2, 'pepe']))
module.exports = sum;