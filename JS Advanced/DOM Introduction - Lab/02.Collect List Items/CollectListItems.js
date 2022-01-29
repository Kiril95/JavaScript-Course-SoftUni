function extractText() {
    let getListItems = document.querySelectorAll('ul li'); // Or ('#items li')
    let getTextArea = document.getElementById('result');
    let converted = Array.from(getListItems);
 
    getTextArea.textContent = converted.map(x => x.textContent).join('\n'); 
}  
