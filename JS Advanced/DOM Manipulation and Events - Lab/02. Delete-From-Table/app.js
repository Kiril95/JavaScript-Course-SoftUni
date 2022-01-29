function deleteByEmail() {
    let inputField = document.querySelector('input[type=text]');
    let resultField = document.querySelector('#result');
    let emails = document.querySelectorAll('td:nth-child(2)');

    for (const email of emails) {
        if (email.textContent.includes(inputField.value)) {
            email.parentNode.remove();
            resultField.textContent = "Deleted.";
            break;
        }
        else {
            resultField.textContent = "Not found.";
        }
    }
}