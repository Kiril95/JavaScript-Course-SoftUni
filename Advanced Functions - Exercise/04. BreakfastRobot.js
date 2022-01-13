function solution() {
    let ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    return function (info) {
        let [operation, productOrIngredient, quantity] = info.split(" ");

        if (operation === 'restock') {
            ingredients[productOrIngredient] += Number(quantity);
            return 'Success';

        } else if (operation === 'prepare') {
            if (productOrIngredient === 'apple') {

                if (ingredients.carbohydrate >= 1 * quantity && ingredients.flavour >= 2 * quantity) {
                    ingredients.carbohydrate -= 1 * quantity;
                    ingredients.flavour -= 2 * quantity;
                    return 'Success';
                } else {
                    return `Error: not enough ${ingredients.carbohydrate < 1 * quantity ? 'carbohydrate' : 'flavour'} in stock`;
                }

            } else if (productOrIngredient === 'lemonade') {

                if (ingredients.carbohydrate >= 10 * quantity && ingredients.flavour >= 20 * quantity) {
                    ingredients.carbohydrate -= 10 * quantity;
                    ingredients.flavour -= 20 * quantity;
                    return 'Success';
                } else {
                    return `Error: not enough ${ingredients.carbohydrate < 10 * quantity ? 'carbohydrate' : 'flavour'} in stock`;
                }

            } else if (productOrIngredient === 'burger') {

                if (ingredients.carbohydrate >= 5 * quantity && ingredients.flavour >= 3 * quantity && ingredients.fat >= 7 * quantity) {
                    ingredients.carbohydrate -= 5 * quantity;
                    ingredients.flavour -= 3 * quantity;
                    ingredients.fat -= 7 * quantity;
                    return 'Success';
                } else {
                    return `Error: not enough ${ingredients.carbohydrate < 5 * quantity ? (ingredients.flavour < 3 * quantity ? 'flavour' : 'fat') : 'carbohydrate'} in stock`;
                }

            } else if (productOrIngredient === 'eggs') {

                if (ingredients.protein >= 5 * quantity && ingredients.fat >= 1 * quantity && ingredients.flavour >= 1 * quantity) {
                    ingredients.protein -= 5 * quantity;
                    ingredients.fat -= 1 * quantity;
                    ingredients.flavour -= 1 * quantity;
                    return 'Success';
                } else {
                    return `Error: not enough ${ingredients.protein < 5 * quantity ? (ingredients.fat < 1 * quantity ? 'fat' : 'flavour') : 'protein'} in stock`;
                }

            } else if (productOrIngredient === 'turkey') {

                if (ingredients.protein < 10 * quantity) {
                    return "Error: not enough protein in stock"
                }
                else if (ingredients.carbohydrate < 10 * quantity) {
                    return "Error: not enough carbohydrate in stock"
                }
                else if (ingredients.fat < 10 * quantity) {
                    return "Error: not enough fat in stock"
                }
                else if (ingredients.flavour < 10 * quantity) {
                    return "Error: not enough flavour in stock"
                }
                else {
                    ingredients.protein -= 10 * quantity;
                    ingredients.carbohydrate -= 10 * quantity;
                    ingredients.fat -= 10 * quantity;
                    ingredients.flavour -= 10 * quantity;
                    return "Success"
                }
            }
        } else {
            let message = ''
            for (const [key, value] of Object.entries(ingredients)) {
                message += `${key}=${value} `;
            }
            return message.trimEnd();
        }
    }
}
let manager = solution();
console.log(manager("prepare turkey 1"));
console.log(manager("restock protein 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock carbohydrate 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare turkey 1"));
console.log(manager("report"));                