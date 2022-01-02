function solve() {
  let getInputField = Array.from(document.querySelector('#input').value.split(".").filter(x => x));
  let getOutputField = document.querySelector('#output');
  let deepCopy = JSON.parse(JSON.stringify(getInputField));
  let sentenceCounter = 0;
  let node = document.createTextNode('');

  for (let sentence of getInputField) {
    node.appendData(`${sentence}.`);
    sentenceCounter++;
    
    if (sentenceCounter == 3 || deepCopy.length == 1) {
      let paragraph = document.createElement('p');
      paragraph.appendChild(node);
      getOutputField.appendChild(paragraph);
      
      sentenceCounter = 0;
      node = document.createTextNode('');
    }  

    deepCopy.shift();
  }
}