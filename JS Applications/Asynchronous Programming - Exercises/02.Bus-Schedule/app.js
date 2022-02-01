function solve() {
    let infoField = document.querySelector('.info');
    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');
    let stopId = 'depot';  // Start station

    function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId}`;

        fetch(url)
            .then(response => {
                if (response.status != 200) {  // 204 states - 'No content'
                    throw new Error('Error');
                }

                return response.json();
            })
            .then(data => {
                departBtn.disabled = true;
                arriveBtn.disabled = false;

                infoField.textContent = `Next stop ${data.name}`;
            })
            .catch(error => {
                departBtn.disabled = true;
                arriveBtn.disabled = true;
                infoField.textContent = error.message;
            })
    }

    function arrive() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId}`;

        fetch(url)
            .then(response => {
                if (response.status != 200) {
                    throw new Error('Error');
                }

                return response.json();
            })
            .then(data => {
                departBtn.disabled = false;
                arriveBtn.disabled = true;
                stopId = data.next;

                infoField.textContent = `Arriving at ${data.name}`;
            })
            .catch(error => {
                departBtn.disabled = true;
                arriveBtn.disabled = true;
                infoField.textContent = error.message;
            })
    }

    return { depart, arrive };
}

let result = solve();