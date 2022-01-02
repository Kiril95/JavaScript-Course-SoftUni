function solve() {
  let textField = document.querySelector('#text').value;
  let namingField = document.querySelector('#naming-convention').value;
  let resultField = document.querySelector('#result');

  if (namingField === 'Camel Case') {
    resultField.textContent = makeCamelCase(textField);
  }
  else if (namingField === 'Pascal Case') {
    resultField.textContent = makePascalCase(textField);
  }
  else {
    resultField.textContent = 'Error!';
    return;
  }

  function makeCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  function makePascalCase(text) {
    return text 
      .split(" ")
      .map(x => x.toLocaleLowerCase())
      .map(x => `${x.charAt(0).toLocaleUpperCase()}${x.slice(1)}`)
      .join("");
  }
}