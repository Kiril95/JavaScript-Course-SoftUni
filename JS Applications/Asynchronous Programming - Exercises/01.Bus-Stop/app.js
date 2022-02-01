function getInfo() {
    let idField = document.querySelector('#stopId').value;
    let stopNameField = document.querySelector('#stopName');
    let busSection = document.querySelector('#buses');
    let validIds = ['1287', '1308', '1327', '2334'];
    const url = `http://localhost:3030/jsonstore/bus/businfo/${idField}`;
   
    fetch(url)
        .then(response => {
            if (!validIds.includes(idField)) {
                throw new Error('Error');
            }

            return response.json();
        })
        .then(data => {
            busSection.replaceChildren(); // Smart way for removing the list elements

            Object.entries(data.buses)
                .map(([bus, time]) => {
                    let liElement = document.createElement('li');
                    liElement.textContent = `Bus ${bus} arrives in ${time}`;

                    busSection.appendChild(liElement);
                });
        })
        .catch(error => {
            busSection.replaceChildren();  // Incase of an error the bus section must be cleared aswell

            stopNameField.textContent = error.message;
        })

}