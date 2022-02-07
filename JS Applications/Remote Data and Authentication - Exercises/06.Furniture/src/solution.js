const createForm = document.querySelector('#create');
const ordersBtn = document.querySelector('#orders');
const buyBtn = document.querySelector('#buy');

function attachEvents() {
    window.addEventListener('load', loadFurniture);

    createForm.addEventListener('submit', createFurniture);
    buyBtn.addEventListener('click', buyFurniture);
    ordersBtn.addEventListener('click', generateOrders);
}

async function loadFurniture() {
    const tableBody = document.querySelector('tbody');
    tableBody.replaceChildren();

    try {
        const response = await fetch('http://localhost:3030/data/furniture');
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        Object.values(data).forEach(info => {
            let tableRow = createElement('tr', undefined, tableBody);
            let imageTD = createElement('img', undefined, tableRow);
            imageTD.setAttribute('src', info.img);

            let nameTD = createElement('td', info.name, tableRow);
            let priceTD = createElement('td', info.price, tableRow);
            let decFactorTD = createElement('td', info.factor, tableRow);

            let checkboxTD = createElement('input', undefined, tableRow);
            checkboxTD.type = 'checkbox';

            tableBody.appendChild(tableRow);
        });

    } catch (error) {
        alert(error.message);
    }
}

async function createFurniture(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const price = formData.get('price');
    const factor = formData.get('factor');
    const img = formData.get('img');

    if (name == '' || price == '' || factor == '' || img == '') {
        alert('Please fill the required fields!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/data/furniture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({ name, price, factor, img, id: sessionStorage.getItem('userId') })
        })
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }

        createForm.reset();
        loadFurniture();

    } catch (error) {
        alert(error.message);
    }
}

async function buyFurniture(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
  
    for (let item of checkboxes) {
        if (item.checked) {
            const orderInfo = item.parentNode.children;
            let [img, name, price, factor] = [...orderInfo];
           
            try {
                await fetch('http://localhost:3030/data/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': sessionStorage.getItem('authToken')
                    },
                    body: JSON.stringify({
                        img: img.src,
                        name: name.textContent, 
                        price: Number(price.textContent), 
                        factor: factor.textContent 
                    })
                })

                item.checked = false; // Uncheck item

            } catch (error) {
                alert(error.message);
            }
        }
    }
}

async function generateOrders(event) {
    event.preventDefault();
    let targetId = sessionStorage.getItem('userId');
    //let ordersSection = document.querySelector('.orders');

    try {
        const response = await fetch(`http://localhost:3030/data/orders?where=_ownerId%3D"${targetId}"`);
        const data = await response.json();

        if (!response.ok || response.status != 200) {
            throw new Error(data.message);
        }
        let furnitures = [];
        let totalPrice = 0;

        for (let item of data) {
            furnitures.push(item.name);
            totalPrice += Number(item.price);
        }
        
        // Smart way for updating the results
        document.querySelector('.orders p > span').textContent = furnitures.join(', ');
        document.querySelector('.orders p:nth-child(2) > span').textContent = `${totalPrice} $`;
        
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