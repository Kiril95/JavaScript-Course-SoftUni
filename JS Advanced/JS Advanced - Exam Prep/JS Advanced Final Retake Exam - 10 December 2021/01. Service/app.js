window.addEventListener('load', solve);

function solve() {
    let productType = document.querySelector('#type-product');
    let descrField = document.querySelector('#description');
    let [nameField, phoneField] = document.querySelectorAll('input[type=text]');
    let [sendBtn, clearBtn] = document.querySelectorAll('button');
    let receivedOrdersSection = document.querySelector('#received-orders');
    let completedOrdersSection = document.querySelector('#completed-orders');

    sendBtn.addEventListener('click', sendRequest);
    clearBtn.addEventListener('click', clearRepairs);

    function sendRequest(event) {
        event.preventDefault();

        if (nameField.value && phoneField.value && descrField.value) {
            if (productType.value == 'Computer') {
                createForm(productType, nameField, phoneField, descrField);
            } else if (productType.value == 'Phone') {
                createForm(productType, nameField, phoneField, descrField);
            }

            nameField.value = '';
            phoneField.value = '';
            descrField.value = '';
        }
    }

    function clearRepairs() {
        Array.from(document.querySelectorAll('#completed-orders .container')).forEach(x => x.remove());
    }

    function createForm(type, name, phone, description) {
        let mainDiv = createElement('div', '', 'container', receivedOrdersSection);

        let h2El = createElement('h2', `Product type for repair: ${type.value}`, '', mainDiv);
        let h3El = createElement('h3', `Client information: ${name.value}, ${phone.value}`, '', mainDiv);
        let h4El = createElement('h4', `Description of the problem: ${description.value}`, '', mainDiv);

        let startBtn = createElement('button', `Start repair`, 'start-btn', mainDiv);
        let finishBtn = createElement('button', `Finish repair`, 'finish-btn', mainDiv);
        finishBtn.disabled = true;

        startBtn.addEventListener('click', (event) => {
            event.target.disabled = true;
            finishBtn.disabled = false;
        });

        finishBtn.addEventListener('click', (event) => {
            let [btn1, btn2] = event.target.parentNode.querySelectorAll('button');
            let targetRepair = event.target.parentNode;
            btn1.remove();
            btn2.remove();
            completedOrdersSection.appendChild(targetRepair);
        });
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