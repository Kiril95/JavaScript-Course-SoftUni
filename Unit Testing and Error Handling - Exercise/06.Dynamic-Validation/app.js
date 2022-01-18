function validate() {
    let inputField = document.querySelector('#email');
    const pattern = /[a-z]*@[a-z]*\.[a-z]*/g;

    inputField.addEventListener('change', function () {
        if (inputField.value.match(pattern)) {
            alert("Valid email address!");
            inputField.classList = '';
        } else {
            alert("Invalid email address!");
            inputField.classList = 'error';
        }
    });
}