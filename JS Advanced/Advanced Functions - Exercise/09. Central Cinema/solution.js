function solve() {
    let [nameField, hallField, priceField] = document.querySelectorAll('input[type=text]');
    let [onScreenButton, clearButton] = document.querySelectorAll('button');
    let [moviesList, archiveList] = document.querySelectorAll('ul');

    onScreenButton.addEventListener('click', addMovie);
    clearButton.addEventListener('click', deleteMovies);

    function addMovie(event) {
        event.preventDefault();

        if (nameField.value && hallField.value && priceField.value && parseInt(priceField.value)) {
            let listElement = document.createElement('li');

            let spanElement = document.createElement('span');
            let firstStrongElement = document.createElement('strong');
            spanElement.textContent = nameField.value;
            firstStrongElement.textContent = `Hall: ${hallField.value}`;

            listElement.appendChild(spanElement);
            listElement.appendChild(firstStrongElement);

            let divElement = document.createElement('div');
            let secondStrongElement = document.createElement('strong');
            let inputElement = document.createElement('input');
            let archiveBtn = document.createElement('button');

            secondStrongElement.textContent = Number(priceField.value).toFixed(2);
            inputElement.setAttribute('placeholder', 'Tickets Sold');
            archiveBtn.textContent = 'Archive';

            archiveBtn.addEventListener('click', archive);  // Archive

            divElement.appendChild(secondStrongElement);
            divElement.appendChild(inputElement);
            divElement.appendChild(archiveBtn);
            listElement.appendChild(divElement);

            moviesList.appendChild(listElement);

            nameField.value = '';
            hallField.value = '';
            priceField.value = '';
        }
    }

    function archive(event) {
        let inputField = event.target.parentNode.children[1];
        let movieName = event.target.parentNode.parentNode.children[0];
        let moviePrice = event.target.parentNode.children[0];

        if (inputField.value && !isNaN(Number(inputField.value))) {
            let listElement = document.createElement('li');

            let spanElement = document.createElement('span');
            let strongElement = document.createElement('strong');
            let deleteBtn = document.createElement('button');

            spanElement.textContent = movieName.textContent;
            strongElement.textContent = `Total amount: ${Number(Number(moviePrice.textContent) * Number(inputField.value)).toFixed(2)}`;
            deleteBtn.textContent = 'Delete';

            listElement.appendChild(spanElement);
            listElement.appendChild(strongElement);
            listElement.appendChild(deleteBtn);
            archiveList.appendChild(listElement);

            let targetList = event.target.parentNode.parentNode
            event.target.parentNode.parentNode.parentNode.removeChild(targetList); //Delete movie on screen

            deleteBtn.addEventListener('click', function (event) {      // Delete movie in archive
                let targetList = event.target.parentNode;
                event.target.parentNode.parentNode.removeChild(targetList);
            });
        }
    }

    function deleteMovies() {
        let parentList = document.querySelector("#archive > ul");

        while (parentList.firstChild) {
            parentList.removeChild(parentList.firstChild);
        }
    }
}