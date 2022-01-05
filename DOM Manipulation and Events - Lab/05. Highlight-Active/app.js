function focused() {
    let getDivs = Array.from(document.querySelector('div').children);
    //let allInputFields = Array.from(document.querySelectorAll('input[type=text]')); // Works too

    for (const div of getDivs) {
        let inputField = div.children[1];

        inputField.addEventListener('focus', function(event){
            event.target.parentNode.classList = 'focused';
        });

        inputField.addEventListener('blur', function(event){
            event.target.parentNode.classList = '';
        });
    }
}