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

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());
