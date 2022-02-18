class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this._availableProducts = [];
        this.uniqueProducts = new Set();
    }

    loadingVegetables(vegetables = []) {
        for (const info of vegetables) {
            let [type, quantity, price] = info.split(' ');
            quantity = Number(quantity);
            price = Number(price);
            this.uniqueProducts.add(type);

            let targetProduct = this._availableProducts.find(x => x.type == type);

            if (targetProduct) {
                targetProduct.quantity += quantity;
                if (targetProduct.price < price) {
                    targetProduct.price = price;
                }
            } else {
                let vegetable = { type, quantity, price };
                this._availableProducts.push(vegetable);
            }
        }
        return `Successfully added ${Array.from(this.uniqueProducts).join(', ')}`;
    }

    buyingVegetables(selectedProducts = []) {
        let totalPrice = 0;

        for (const info of selectedProducts) {
            let [type, quantity] = info.split(' ');
            quantity = Number(quantity);

            let targetProduct = this._availableProducts.find(x => x.type == type);

            if (!targetProduct) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }
            if (quantity > targetProduct.quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }

            let currentPrice = targetProduct.price * quantity;
            totalPrice += currentPrice;
            targetProduct.quantity -= quantity;
        }
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
    }

    rottingVegetable(type, quantity) {
        let targetProduct = this._availableProducts.find(x => x.type == type);

        if (!targetProduct) {
            throw new Error(`${type} is not available in the store.`);
        }
        if (quantity > targetProduct.quantity) {
            targetProduct.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`;
        }

        targetProduct.quantity -= quantity;

        return `Some quantity of the ${type} has been removed.`;
    }

    revision() {
        let output = [];

        output.push("Available vegetables:");
        for (const vegetable of this._availableProducts.sort((a, b) => a.price - b.price)) {
            output.push(`${vegetable.type}-${vegetable.quantity}-$${vegetable.price}`);
        }
        output.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`);

        return output.join('\n');
    }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log(vegStore.rottingVegetable("Okra", 1));
console.log(vegStore.rottingVegetable("Okra", 2.5));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());