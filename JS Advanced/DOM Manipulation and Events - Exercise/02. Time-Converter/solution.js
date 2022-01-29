function attachEventsListeners() {
    let daysBtn = document.querySelector('#daysBtn');
    let hoursBtn = document.querySelector('#hoursBtn');
    let minutesBtn = document.querySelector('#minutesBtn');
    let secondsBtn = document.querySelector('#secondsBtn');

    let daysField = document.querySelector('#days');
    let hoursField = document.querySelector('#hours');
    let minutesField = document.querySelector('#minutes');
    let secondsField = document.querySelector('#seconds');

    daysBtn.addEventListener('click', function () {
        hoursField.value = daysField.value * 24;
        minutesField.value = daysField.value * 1440;
        secondsField.value = daysField.value * 86400;
    })

    hoursBtn.addEventListener('click', function () {
        daysField.value = hoursField.value / 24;
        minutesField.value = hoursField.value * 60;
        secondsField.value = hoursField.value * 3600;
    })

    minutesBtn.addEventListener('click', function () {
        daysField.value = minutesField.value / 1440;
        hoursField.value = minutesField.value / 60;
        secondsField.value = minutesField.value * 60;
    })

    secondsBtn.addEventListener('click', function () {
        daysField.value = secondsField.value / 86400;
        hoursField.value = secondsField.value / 3600;
        minutesField.value = secondsField.value / 60;
    })
}