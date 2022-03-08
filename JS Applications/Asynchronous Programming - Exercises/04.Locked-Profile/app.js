async function lockedProfile() {
    const baseUrl = `http://localhost:3030/jsonstore/advanced/profiles`;
    let mainDiv = document.querySelector('main');
    mainDiv.replaceChildren();  // Remove example user
   
    try {
        const response = await fetch(baseUrl);

        if (!response.ok || response.status != 200) {
            throw new Error('Invalid request');
        }

        const data = await response.json();  // Data that contains the users

        for (let info of Object.values(data)) {
            let profileBox = createElement('div', undefined, 'profile', undefined, mainDiv);

            let imgElement = createElement('img', undefined, 'userIcon', undefined, profileBox);
            imgElement.setAttribute('src', './iconProfile2.png');
            let labelLock = createElement('label', undefined, undefined, undefined, profileBox);
            labelLock.textContent = 'Lock';
            let inputLock = createElement('input', 'radio', undefined, 'userLocked', profileBox);
            inputLock.checked = true;
            inputLock.value = 'lock';
            let labelUnlock = createElement('label', undefined, undefined, undefined, profileBox);
            labelUnlock.textContent = 'Unlock';
            let inputUnlock = createElement('input', 'radio', undefined, 'userLocked', profileBox);
            inputUnlock.value = 'unlock';
            let brElement = createElement('br', undefined, undefined, undefined, profileBox);
            let hrElement = createElement('hr', undefined, undefined, undefined, profileBox);
            let labelUsername = createElement('label', undefined, undefined, undefined, profileBox);
            labelUsername.textContent = 'Username';
            let inputUsername = createElement('input', 'text', undefined, 'userUsername', profileBox);
            inputUsername.value = `${info.username}`;
            inputUsername.disabled = true;
            inputUsername.readOnly = true;

            let hiddenDiv = createElement('div', undefined, undefined, undefined, profileBox);
            hiddenDiv.id = 'userHiddenFields';
            let hrElement2 = createElement('hr', undefined, undefined, undefined, hiddenDiv);
            let labelEmail = createElement('label', undefined, undefined, undefined, hiddenDiv);
            labelEmail.textContent = 'Email:';
            let inputEmail = createElement('input', 'email', undefined, 'userEmail', hiddenDiv);
            inputEmail.value = `${info.email}`;
            inputEmail.disabled = true;
            inputEmail.readOnly = true;
            hiddenDiv.style.display = 'none';

            let labelAge = createElement('label', undefined, undefined, undefined, hiddenDiv);
            labelAge.textContent = 'Age:';
            let inputAge = createElement('input', 'email', undefined, 'userAge', hiddenDiv);
            inputAge.value = `${info.age}`;
            inputAge.disabled = true;
            inputAge.readOnly = true;

            let button = createElement('button', undefined, undefined, undefined, profileBox);
            button.textContent = 'Show more';  
        }

    } catch (error) {
        alert(error.message);
    }

    let buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach(btn => {
        btn.addEventListener('click', revealInformation);
    });
}

function revealInformation(event) {
    let parentDiv = event.target.parentNode;
    let hiddenDiv = parentDiv.querySelector('#userHiddenFields');
    //let lock = parentDiv.querySelector(':nth-child(3)');
    let unlock = parentDiv.querySelector(':nth-child(5)');
    
    if (unlock.checked && event.target.textContent == "Show more") {
        hiddenDiv.style.display = 'block';
        event.target.textContent = 'Hide it';
    } else if (unlock.checked && event.target.textContent == "Hide it") {
        hiddenDiv.style.display = 'none';
        event.target.textContent = 'Show more';
    }
}

function createElement(element, type, className, name, parent) {
    const elem = document.createElement(element);

    if (type) {
        elem.type = type;
    }
    if (className) {
        elem.className = className;
    }
    if (name) {
        elem.name = name;
    }
    if (parent) {
        parent.appendChild(elem);
    }

    return elem;
}
