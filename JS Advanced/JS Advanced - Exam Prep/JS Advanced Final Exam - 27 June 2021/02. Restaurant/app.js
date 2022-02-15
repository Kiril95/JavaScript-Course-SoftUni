class Restaurant {
    constructor(budgetMoney) {
        this.budgetMoney = budgetMoney;
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products = []) {
        for (let i = 0; i < products.length; i++) {
            let [product, prQuantity, prPrice] = products[i].split(' ');
            prQuantity = Number(prQuantity)
            prPrice = Number(prPrice);

            if (prPrice <= this.budgetMoney) {
                if (!this.stockProducts.hasOwnProperty(product)) {
                    this.stockProducts[product] = 0;
                }

                this.stockProducts[product] += prQuantity;
                this.budgetMoney -= prPrice;
                this.history.push(`Successfully loaded ${prQuantity} ${product}`);

            } else {
                this.history.push(`There was not enough money to load ${prQuantity} ${product}`);
            }
        }

        return this.history.join('\n').trim();
    }

    addToMenu(meal, neededProducts = [], price) {
        let products = [];

        for (let info of neededProducts) {
            let [product, quantity] = info.split(' ');
            quantity = Number(quantity);

            products.push([product, quantity]);
        }

        if (!this.menu.hasOwnProperty(meal)) {
            this.menu[meal] = {
                products: products,
                price: Number(price)
            };
            let mealCount = Object.keys(this.menu).length;

            return mealCount == 1 ? `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?` :
                `Great idea! Now with the ${meal} we have ${mealCount} meals in the menu, other ideas?`;
        }

        return `The ${meal} is already in the our menu, try something different.`;
    }

    showTheMenu() {
        let message = [];
        let mealCount = Object.keys(this.menu).length;

        if (mealCount > 0) {
            Object.entries(this.menu).forEach(([meal, values]) => {
                message.push(`${meal} - $ ${values.price}`);
            });

            return message.join('\n');
        }

        return "Our menu is not ready yet, please come later...";
    }

    makeTheOrder(meal) {
        let targetMeal = this.menu[meal];

        if (targetMeal) {
            for (let [product, quantity] of targetMeal.products) {
                if (!this.stockProducts[product]) {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`

                } else {
                    if (this.stockProducts[product] < quantity) {
                        return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
                    }
                    else {
                        this.stockProducts[product] -= quantity;
                    }
                }
            }
            this.budgetMoney += targetMeal.price;

            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${targetMeal.price}.`;
        }

        return `There is not ${meal} yet in our menu, do you want to order something else?`;
    }
}

let kitchen = new Restaurant(1000);
kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));