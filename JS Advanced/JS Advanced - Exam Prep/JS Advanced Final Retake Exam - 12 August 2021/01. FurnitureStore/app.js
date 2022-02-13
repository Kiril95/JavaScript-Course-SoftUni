window.addEventListener('load', solve);

function solve() {
    let infoTable = document.querySelector('#information');
    let furnitureList = document.querySelector('#furniture-list');

    let model = document.querySelector('#model');
    let year = document.querySelector('#year');
    let description = document.querySelector('#description');
    let price = document.querySelector('#price');
    let addBtn = document.querySelector('#add');

    addBtn.addEventListener('click', addFurniture);

    function addFurniture() {
        if (!model.value || !year.value || !description.value || !price.value) {
            return alert('Please fill all the fields!');
        }
        if (typeof model.value !== 'string' || typeof description.value !== 'string') {
            return alert('Model and Description must be strings!');
        }
        if (year.value < 0 || price.value < 0) {
            return alert('Year and price must have positive values!');
        }

        let infoTR = createElement('tr', undefined, 'info', furnitureList);
        let modelTD = createElement('td', model.value, undefined, infoTR);
        let priceTD = createElement('td', Number(price.value).toFixed(2), undefined, infoTR);

        let buttonsTD = createElement('td', undefined, undefined, infoTR);
        let moreBtn = createElement('button', 'More Info', 'moreBtn', buttonsTD);
        let buyBtn = createElement('button', 'Buy it', 'buyBtn', buttonsTD);

        let hideTR = createElement('tr', undefined, 'hide', furnitureList);
        let yearTD = createElement('td', `Year: ${year.value}`, undefined, hideTR);
        let descrTD = createElement('td', `Description: ${description.value}`, undefined, hideTR);
        descrTD.colSpan = '3';

        moreBtn.addEventListener('click', showMore);
        buyBtn.addEventListener('click', buyIt);

        model.value = '';
        year.value = '';
        description.value = '';
        price.value = '';
    }

    function showMore(event) {
        let targetBtn = event.target;
        let hiddenInfo = event.target.parentNode.parentNode.nextSibling;

        if (targetBtn.textContent == 'More Info') {
            targetBtn.textContent = 'Less Info';
            hiddenInfo.style.display = 'contents';

        } else {
            targetBtn.textContent = 'More Info';
            hiddenInfo.style.display = 'none';
        }
    }

    function buyIt(event) {
        let infoTR = event.target.parentNode.parentNode;
        let price = Number(infoTR.querySelector(':nth-child(2)').textContent);
        let hidenTR = event.target.parentNode.parentNode.nextSibling;
        infoTR.remove();
        hidenTR.remove();

        let totalPrice = document.querySelector('.total-price');
        totalPrice.textContent = (Number(totalPrice.textContent) + price).toFixed(2);
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