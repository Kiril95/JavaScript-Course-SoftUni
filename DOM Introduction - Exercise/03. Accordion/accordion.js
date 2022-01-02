function toggle() {
    let getButton = document.querySelector('.button');
    let getText = document.querySelector('#extra');

    if (getButton.textContent === 'More') {
        getButton.textContent = 'Less';
        getText.style.display = 'block';
    }
    else{
        getButton.textContent = 'More';
        getText.style.display = 'none';
    }
}