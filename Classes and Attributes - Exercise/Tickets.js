function solution(strArr = [], criteria) {
    let storage = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }
    for (const info of strArr) {
        let [dest, price, status] = info.split("|");
        let ticket = new Ticket(dest, Number(price), status);
        storage.push(ticket);
    }

    let sortedArr = storage.sort((x, y) => typeof x[criteria] === 'string'
        ? x[criteria].localeCompare(y[criteria])
        : x[criteria] - y[criteria]);

    return sortedArr;
}

solution(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination')