function calculator() {
    let [firstNum, secondNum, resultField] = '';

    let commands = {
        init: function (s1, s2, s3) {
            firstNum = document.querySelector(s1);
            secondNum = document.querySelector(s2);
            resultField = document.querySelector(s3);
        },
        add: function () {
            resultField.value = Number(firstNum.value) + Number(secondNum.value);
        },
        subtract: function () {
            resultField.value = Number(firstNum.value) - Number(secondNum.value);
        }
    }

    return commands;
}

const calculate = calculator();
calculate.init('#num1', '#num2', '#result'); 