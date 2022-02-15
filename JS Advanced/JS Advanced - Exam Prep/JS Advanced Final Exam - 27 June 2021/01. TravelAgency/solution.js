window.addEventListener('load', solution);

function solution() {
    let previewList = document.querySelector('#infoPreview');
    let blockDiv = document.querySelector('#block');
    let [nameField, emailField, phoneField, adressField, postField] = document.querySelectorAll('#form div :nth-child(2)');
    let [submitBtn, editBtn, continueBtn] = document.querySelectorAll('input[type=button]');

    submitBtn.addEventListener('click', previewInfo);

    function previewInfo() {
        if (!nameField.value || !emailField.value) {
            return alert('Please fill your Name and Email adress!');
        }

        let li1 = document.createElement('li');
        li1.textContent = `Full Name: ${nameField.value}`

        let li2 = document.createElement('li');
        li2.textContent = `Email: ${emailField.value}`

        let li3 = document.createElement('li');
        li3.textContent = `Phone Number: ${phoneField.value}`

        let li4 = document.createElement('li');
        li4.textContent = `Address: ${adressField.value}`

        let li5 = document.createElement('li');
        li5.textContent = `Postal Code: ${postField.value}`

        previewList.appendChild(li1);
        previewList.appendChild(li2);
        previewList.appendChild(li3);
        previewList.appendChild(li4);
        previewList.appendChild(li5);
       
        editBtn.disabled = false;
        continueBtn.disabled = false;
        submitBtn.disabled = true;

        editBtn.addEventListener('click', editInfo);
        continueBtn.addEventListener('click', finishReservation);

        nameField.value = '';
        emailField.value = '';
        phoneField.value = '';
        adressField.value = '';
        postField.value = '';
    }

    function editInfo() {
        let [name, email, phone, adress, post] = document.querySelectorAll('#infoPreview li');
        editBtn.disabled = true;
        continueBtn.disabled = true;
        submitBtn.disabled = false;

        nameField.value = name.textContent.split(': ')[1];
        emailField.value = email.textContent.split(': ')[1];
        phoneField.value = phone.textContent.split(': ')[1];
        adressField.value = adress.textContent.split(': ')[1];
        postField.value = post.textContent.split(': ')[1];

        previewList.innerHTML = '';
    }

    function finishReservation() {
        blockDiv.innerHTML = "<h3>Thank you for your reservation!</h3>";
    }
}