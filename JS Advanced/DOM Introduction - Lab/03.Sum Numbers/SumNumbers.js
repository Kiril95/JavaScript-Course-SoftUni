function calc() {
    let first = Number(document.getElementById('num1').value);
    let second = Number(document.getElementById('num2').value);
    let getSum = document.getElementById('sum');

    getSum.value = first + second;
}
