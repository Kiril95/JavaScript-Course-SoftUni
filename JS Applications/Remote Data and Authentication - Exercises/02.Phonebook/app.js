function attachEvents() {
    let createBtn = document.querySelector('#btnCreate');
    let loadBtn = document.querySelector('#btnLoad');

    loadBtn.addEventListener('click', loadBooks)
    createBtn.addEventListener('click', createSubscriber)
}

async function createSubscriber() {
    let [personField, phoneField] = document.querySelectorAll('input[type=text]');

    try {
        if (personField.value == '' || phoneField.value == '') {
            alert('Please fill the required fields!');
            return;
        }

        const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person: `${personField.value}`, phone: `${phoneField.value}` })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            let parse = JSON.parse(data);
            throw new Error(parse.message);
        }

        personField.value = '';
        phoneField.value = '';

        location.reload(); // Reload page

    } catch (error) {
        alert(error.message);
    }
}

async function loadBooks() {
    let phonebookList = document.querySelector('#phonebook');
    phonebookList.replaceChildren(); // So we dont generate the same users every time we click on 'Load'

    try {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook');
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info => {
            let listElement = document.createElement('li');
            listElement.textContent = `${info.person}: ${info.phone}`;

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('id', info._id);

            listElement.appendChild(deleteBtn);
            phonebookList.appendChild(listElement);

            deleteBtn.addEventListener('click', deleteEntry);
        });

    } catch (error) {
        alert(error.message);
    }
}

async function deleteEntry(event) {
    let targetId = event.target.getAttribute('id');

    const response = await fetch(`http://localhost:3030/jsonstore/phonebook/${targetId}`, {
        method: 'delete'
    });

    event.target.parentNode.remove();
}

attachEvents();