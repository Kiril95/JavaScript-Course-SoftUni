function validate() {
    let submitButton = document.querySelector('#submit');
    let usernameField = document.querySelector('#username');
    let emailField = document.querySelector('#email');
    let passwordField = document.querySelector('#password');
    let confirmPassField = document.querySelector('#confirm-password');
    let checkbox = document.querySelector('#company');

    let companySection = document.querySelector('#companyInfo');
    let companyNumberField = document.querySelector('#companyNumber');

    let validSection = document.querySelector('#valid');

    submitButton.addEventListener('click', validate);

    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            companySection.style.display = 'block';
        } else {
            companySection.style.display = 'none';
        }
    });

    function validate(event) {
        event.preventDefault()

        let usernamePattern = /^[A-Za-z\d]{3,20}$/g;
        let passwordPattern = /^[\w_]{5,15}$/g;
        let confirmPassPattern = /^[\w_]{5,15}$/g;
        let emailPattern = /.*@.*\..*/g;
        let isEveryFieldValid = false;

        if (!usernameField.value.match(usernamePattern)) {
            usernameField.style.borderColor = 'red';
            isEveryFieldValid = false;
        } else {
            usernameField.style.border = 'none';
            isEveryFieldValid = true;
        }

        if (passwordField.value.match(passwordPattern) && confirmPassField.value.match(confirmPassPattern)
            && passwordField.value === confirmPassField.value) {

            passwordField.style.border = 'none';
            confirmPassField.style.border = 'none';
            isEveryFieldValid = true;
        } else {
            passwordField.style.borderColor = 'red';
            confirmPassField.style.borderColor = 'red';
            isEveryFieldValid = false;
        }

        if (!emailField.value.match(emailPattern)) {
            emailField.style.borderColor = 'red';
            isEveryFieldValid = false;
        } else {
            emailField.style.border = 'none';
            isEveryFieldValid = true;
        }

        if (checkbox.checked) {
            if ((Number(companyNumberField.value) >= 1000 && Number(companyNumberField.value) <= 9999)) {
                companyNumberField.style.border = 'none';
                isEveryFieldValid = true;
            } else {
                companyNumberField.style.borderColor = 'red';
                isEveryFieldValid = false;
            }
        }

        if (isEveryFieldValid) {
            validSection.style.display = 'block';
        } else {
            validSection.style.display = 'none';
        }
    }
}