function validate() {
    let inputField = document.querySelector('#email');

    inputField.addEventListener('change', function (event) {
        const pattern = /[a-z]+@[a-z]+\.[a-z]+/g;
        
        if(pattern.test(inputField.value)) {
            event.target.classList = '';
        } else {
            event.target.classList = 'error';
        }
    });
}