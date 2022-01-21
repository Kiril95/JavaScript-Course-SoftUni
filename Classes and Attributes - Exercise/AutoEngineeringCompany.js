function solution(inputArr = []) {
    let registry = {};

    for (const info of inputArr) {
        let [brand, model, quantity] = info.split(" | ");
        let isModelPresent = false;
        quantity = Number(quantity);

        if (!registry[brand]) {
            registry[brand] = [];
        }
        if (registry[brand]) {
            for (const brand of Object.keys(registry)) { 
                // Reach inside every brand and check if the model is already present
                for (const kvp of registry[brand]) {
                    if (kvp.model == model) {
                        kvp.quantity += quantity;
                        isModelPresent = true;
                    }
                }
            }
            if (!isModelPresent) {
                registry[brand].push({ model, quantity })
            }
        }
    }
    for (const car of Object.keys(registry)) {
        console.log(car);

        for (const kvp of registry[car]) {
            console.log(`###${kvp.model} -> ${kvp.quantity}`);
        }
    }
}

solution(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'])