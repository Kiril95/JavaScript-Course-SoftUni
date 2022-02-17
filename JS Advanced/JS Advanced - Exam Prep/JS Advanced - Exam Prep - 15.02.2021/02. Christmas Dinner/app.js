class ChristmasDinner {
    constructor(budget) {
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }
    get budget() {
        return this._budget;
    }
    set budget(value) {
        if (value < 0) {
            throw new Error("The budget cannot be a negative number");
        }
        this._budget = value;
    }

    shopping(products) {
        const [product, price] = products;

        if (this.budget < price) {
            throw new Error("Not enough money to buy this product");
        }

        this.products.push(product);
        this.budget -= price;

        return `You have successfully bought ${product}!`
    }

    recipes(recipe) {
        const { recipeName, productsList } = recipe;

        Object.values(productsList).forEach(item => {
            if (!this.products.includes(item)) {
                throw new Error("We do not have this product");
            }
        })

        let dish = { recipeName, productsList };
        this.dishes.push(dish);

        return `${recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish) {
        if (!this.dishes.find(x => x.recipeName == dish)) {
            throw new Error("We do not have this dish");
        }
        if (this.guests.hasOwnProperty(name)) {
            throw new Error("This guest has already been invited");
        }

        this.guests[name] = dish;

        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let message = [];

        for (const [name, dish] of Object.entries(this.guests)) {
            let targetDish = this.dishes.find(x => x.recipeName == dish);

            message.push(`${name} will eat ${dish}, which consists of ${targetDish.productsList.join(', ')}`);
        }
        return message.join('\n');
    }
}