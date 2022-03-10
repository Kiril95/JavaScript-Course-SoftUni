function attachEvents() {
    let submitBtn = document.querySelector('#submit');

    window.addEventListener('load', loadStudents);
    submitBtn.addEventListener('click', createStudent);
}

async function createStudent(event) {
    event.preventDefault();

    let form = document.querySelector('#form')
    let firstName = document.getElementsByName('firstName')[0];
    let lastName = document.getElementsByName('lastName')[0];
    let facNumber = document.getElementsByName('facultyNumber')[0];
    let grade = document.getElementsByName('grade')[0];

    try {
        if (firstName.value == '' || lastName.value == '' || facNumber.value == '' || grade.value == '') {
            return alert('Please fill the required fields!');
        }
        if (isNaN(facNumber.value)) {
            return alert('Faculty Number must be a number!');
        }
        if (isNaN(grade.value)) {
            return alert('Grade must be a number!');
        }

        const response = await fetch(`http://localhost:3030/jsonstore/collections/students`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: Number(facNumber.value),
                grade: Number(grade.value).toFixed(2)
            })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            let parse = JSON.parse(data);
            throw new Error(parse.message);
        }

        form.reset();
        loadStudents();

    } catch (error) {
        alert(error.message);
    }
}

async function loadStudents(event) {
    event.preventDefault();
    const tableBody = document.querySelector('tbody');

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students');
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info => {
            let tableRow = createElement('tr', undefined, tableBody);
            let firstNameTD = createElement('td', info.firstName, tableRow);
            let lastNameTD = createElement('td', info.lastName, tableRow);
            let facNumberTD = createElement('td', info.facultyNumber, tableRow);
            let gradeTD = createElement('td', info.grade, tableRow);

            tableBody.appendChild(tableRow);
        });

    } catch (error) {
        alert(error.message);
    }
}

function createElement(element, textCon, parent) {
    const elem = document.createElement(element);

    if (textCon) {
        elem.textContent = textCon;
    }
    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}

attachEvents();
