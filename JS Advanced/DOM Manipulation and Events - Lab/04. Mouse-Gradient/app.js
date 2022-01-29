function attachGradientEvents() {
    let resultField = document.querySelector('#result');
    let getGradient = document.querySelector('#gradient');

    getGradient.addEventListener('mousemove', function (event) {
        resultField.textContent = `${Math.floor((event.offsetX / getGradient.clientWidth) * 100)}%`;
    });

    // getGradient.addEventListener('mouseover', function (event) {
    //     resultField.textContent = `${Math.floor((event.offsetX / getGradient.clientWidth) * 100)}%`;
    // });
}