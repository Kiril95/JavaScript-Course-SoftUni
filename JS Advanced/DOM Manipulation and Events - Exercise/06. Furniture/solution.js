function solve() {
  let [generateBtn, buyBtn] = document.querySelectorAll('button');
  let [generateField, buyField] = document.querySelectorAll('textarea');
  let body = document.querySelector('tbody');

  generateBtn.addEventListener('click', function () {
    let products = JSON.parse(generateField.value);

    for (const product of products) {
      let row = document.createElement('tr');
      let imgElement = document.createElement('td');
      let nameElement = document.createElement('td');
      let priceElement = document.createElement('td');
      let decorationElement = document.createElement('td');
      let checkboxElement = document.createElement('td');

      let img = document.createElement('img');
      img.setAttribute('src', product.img);
      imgElement.appendChild(img);
      row.appendChild(imgElement);

      let name = document.createElement('p');
      name.textContent = product.name;
      nameElement.appendChild(name);
      row.appendChild(nameElement);

      let price = document.createElement('p');
      price.textContent = product.price;
      priceElement.appendChild(price);
      row.appendChild(priceElement);

      let deFact = document.createElement('p');
      deFact.textContent = product.decFactor;
      decorationElement.appendChild(deFact);
      row.appendChild(decorationElement);

      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkboxElement.appendChild(checkbox);
      row.appendChild(checkboxElement);

      body.appendChild(row);
      generateField.value = '';
    }
  });

  buyBtn.addEventListener('click', function () {
    let checkedFields = Array.from(document.querySelectorAll("input[type='checkbox']"));
    let receipt = {
      furnitures: [],
      total: 0,
      decFactor: 0
    };

    for (const item of checkedFields) {
      if (item.checked) {
        let name = item.parentNode.parentNode.children[1].textContent;
        let price = Number(item.parentNode.parentNode.children[2].textContent);
        let dec = Number(item.parentNode.parentNode.children[3].textContent);

        receipt.furnitures.push(name);
        receipt.total += price;
        receipt.decFactor += dec;
      }
    }

    let message = `Bought furniture: ${receipt.furnitures.join(', ')}\nTotal price: ${receipt.total.toFixed(2)}\nAverage decoration factor: ${receipt.decFactor / receipt.furnitures.length}`;
    buyField.value = message;
  });
}