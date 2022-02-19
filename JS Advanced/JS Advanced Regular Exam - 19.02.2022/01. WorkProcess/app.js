function solve() {
    let [firstNameField, lastNameField, birthField, positionField] = document.querySelectorAll('input[type=text]');
    let emailField = document.querySelector('#email');
    let salaryField = document.querySelector('#salary');
    let addBtn = document.querySelector('#add-worker');
    let tableBody = document.querySelector('#tbody');
    let sumSpan = document.querySelector('#sum');

    addBtn.addEventListener('click', addWorker);

    function addWorker(event) {
        event.preventDefault();

        if (firstNameField.value && lastNameField.value && emailField.value && birthField.value&& positionField.value && salaryField.value) {
            let infoTR = createElement('tr', '', '', tableBody);

            let fnameTD = createElement('td', firstNameField.value, '', infoTR);
            let lnameTD = createElement('td', lastNameField.value, '', infoTR);
            let emailTD = createElement('td', emailField.value, '', infoTR);
            let birthTD = createElement('td', birthField.value, '', infoTR);
            let positionTD = createElement('td', positionField.value, '', infoTR);
            let salaryTD = createElement('td', salaryField.value, '', infoTR);

            let buttonsTD = createElement('td', '', '', infoTR);
            let fireBtn = createElement('button', 'Fired', 'fired', buttonsTD);
            let editBtn = createElement('button', 'Edit', 'edit', buttonsTD);

            let newSum = Number(salaryField.value) + Number(sumSpan.textContent);
            sumSpan.textContent = newSum.toFixed(2);

            editBtn.addEventListener('click', editForm);
            fireBtn.addEventListener('click', deleteWorker);

            Array.from(document.querySelectorAll('input[type=text]')).forEach(field => {
                field.value = '';
            });
            emailField.value = '';
            salaryField.value = '';
        }
    }

    function editForm(event) {
        let [fname, lname, email, birth, position, salary, _] = event.target.parentNode.parentNode.querySelectorAll('td');

        firstNameField.value = fname.textContent;
        lastNameField.value = lname.textContent;
        emailField.value = email.textContent;
        birthField.value = birth.textContent;
        positionField.value = position.textContent;
        salaryField.value = salary.textContent;

        let updatedSum = Number(sumSpan.textContent) - Number(salary.textContent);
        sumSpan.textContent = updatedSum.toFixed(2);

        event.target.parentNode.parentNode.remove();   
    }

    function deleteWorker(event){
        let salary = event.target.parentNode.parentNode.querySelector(':nth-child(6)');

        let updatedSum = Number(sumSpan.textContent) - Number(salary.textContent);
        sumSpan.textContent = updatedSum.toFixed(2)

        event.target.parentNode.parentNode.remove();   
    }

    function createElement(type, textCon, classList, parent) {
        const element = document.createElement(type);

        if (textCon) {
            element.textContent = textCon;
        }
        if (classList) {
            element.classList = classList;
        }
        if (parent) {
            parent.appendChild(element);
        }

        return element;
    }
}

solve()