const baseUrl = `http://localhost:3030/data/catches/`;

let userView = document.getElementById('user');
let guestView = document.getElementById('guest');
const form = document.querySelector('#addForm');
const addBtn = document.querySelector('#addForm .add');

// This sets our homepage depending on that if we are a registered user or not
if (sessionStorage.getItem('authToken')) {
    userView.style.display = 'inline-block';
    guestView.style.display = 'none';
    let userEmail = sessionStorage.getItem('userEmail');

    document.querySelector('p > span').textContent = userEmail;
    addBtn.disabled = false;
} else {
    userView.style.display = 'none';
    guestView.style.display = 'inline-block';
    addBtn.disabled = true;
}

function attachEvents() {
    const loadBtn = document.querySelector('.load');

    loadBtn.addEventListener('click', loadCatches);
    form.addEventListener('submit', addCatch)
}

async function addCatch(event) {
    event.preventDefault();
    let dataForm = new FormData(event.currentTarget)
    let angler = dataForm.get('angler');
    let weight = dataForm.get('weight');
    let species = dataForm.get('species');
    let location = dataForm.get('location');
    let bait = dataForm.get('bait');
    let captureTime = dataForm.get('captureTime');

    try {
        if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
            return alert('Please fill the required fields!');
        }
        if (Number(angler) || Number(species) || Number(location) || Number(bait)) {
            return alert('Input needs to be a string!');
        }
        if (isNaN(weight) || isNaN(captureTime)) {
            return alert('Please enter a number!');
        }

        // Add this 'catch' to the user that is logged in
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({
                angler: angler,
                weight: Number(weight),
                species: species,
                location: location,
                bait: bait,
                captureTime: Number(captureTime)
            })
        });
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        form.reset();
        loadCatches();

    } catch (error) {
        alert(error.message);
    }
}

async function loadCatches() {
    const catchesDiv = document.querySelector('#catches');
    catchesDiv.replaceChildren();

    try {
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.values(data).forEach((info) => {
            let isDisabled = sessionStorage.getItem('userId') == info._ownerId ? false : true; // Determine which to disable!

            let divElement = createElement('div', undefined, undefined, 'catch', undefined, catchesDiv, undefined);

            let label1 = createElement('label', 'Angler', undefined, undefined, undefined, divElement, undefined);
            let inputAngler = createElement('input', undefined, 'text', 'angler', info.angler, divElement, isDisabled);

            let label2 = createElement('label', 'Weight', undefined, undefined, undefined, divElement, undefined);
            let inputWeight = createElement('input', undefined, 'text', 'weight', info.weight, divElement, isDisabled);

            let label3 = createElement('label', 'Species', undefined, undefined, undefined, divElement, undefined);
            let inputSpecies = createElement('input', undefined, 'text', 'species', info.species, divElement, isDisabled);

            let label4 = createElement('label', 'Location', undefined, undefined, undefined, divElement, undefined);
            let inputLocation = createElement('input', undefined, 'text', 'location', info.location, divElement, isDisabled);

            let label5 = createElement('label', 'Bait', undefined, undefined, undefined, divElement, undefined);
            let inputBait = createElement('input', undefined, 'text', 'bait', info.bait, divElement, isDisabled);

            let label6 = createElement('label', 'Capture Time', undefined, undefined, undefined, divElement, undefined);
            let inputCapture = createElement('input', undefined, 'number', 'captureTime', info.captureTime, divElement, isDisabled);

            let updateBtn = createElement('button', 'Update', undefined, 'update', undefined, divElement, isDisabled);
            updateBtn.setAttribute('data-id', info._id);
            let deleteBtn = createElement('button', 'Delete', undefined, 'delete', undefined, divElement, isDisabled);
            deleteBtn.setAttribute('data-id', info._id);

            updateBtn.addEventListener('click', updateCatch); // UPDATE
            deleteBtn.addEventListener('click', deleteCatch); // DELETE
        });

    } catch (error) {
        alert(error.message);
    }
}

async function updateCatch(event) {
    event.preventDefault();
    const [angler, weight, species, location, bait, captureTime] = event.target.parentNode.querySelectorAll('input');
    const targetId = event.target.getAttribute('data-id');

    try {
        // Update a specific 'catch'
        const response = await fetch(`${baseUrl}${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({
                angler: angler.value,
                weight: Number(weight.value),
                species: species.value,
                location: location.value,
                bait: bait.value,
                captureTime: Number(captureTime.value)
            })
        });

        if (!response.ok || response.status != 200) {
            let data = await response.json();
            throw new Error(data.message);
        }

    } catch (error) {
        alert(error.message);
    }
}

async function deleteCatch(event) {
    const targetId = event.target.getAttribute('data-id');

    try {
        const response = await fetch(`${baseUrl}${targetId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            }
        });

        if (!response.ok || response.status != 200) {
            let data = await response.json();
            throw new Error(error.message);
        }

        loadCatches();
    }
    catch (error) {
        alert(error.message);
    }
}

function createElement(element, textCon, type, className, value, parent, disabled) {
    const elem = document.createElement(element);

    if (textCon) {
        elem.textContent = textCon;
    }
    if (type) {
        elem.type = type;
    }
    if (className) {
        elem.className = className;
    }
    if (value) {
        elem.value = value;
    }
    if (parent) {
        parent.appendChild(elem);
    }
    if (disabled) {
        elem.disabled = disabled;
    }

    return elem;
}

attachEvents();