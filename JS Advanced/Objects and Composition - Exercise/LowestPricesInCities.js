function solve(inputArr = []) {
    let resultArr = [];

    for (const info of inputArr) {
        let [townName, productName, price] = info.split(" | ");
        let obj = {
            product: productName,
            productPrice: Number(price),
            townName
        };

        if (resultArr.some(x => x.product === productName)) {
            let targetTown = resultArr.find(x => x.product === productName);
            
            if (targetTown.productPrice > price) {
                targetTown.townName = townName;
                targetTown.productPrice = price;
            }
        }
        else {
            resultArr.push(obj);
        }
    }

    resultArr.forEach((x) => console.log(`${x.product} -> ${x.productPrice} (${x.townName})`))
}

solve(['Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'Mexico City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Washington City | Mercedes | 1000'])     