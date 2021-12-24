function factory(library = {}, orders = []) {
    let result = [];
    let mapp = orders.map(x => x);

    for (const order of mapp) {
        let currentOrder = Object.assign({}, order.template);
        for (const part of order.parts) {
            currentOrder[part] = library[part];
        }

        result.push(currentOrder);
    }

    return result;
}

const library = {
    get1: function() {
        return 1;
    },
    get3: function() {
        return 3;
    },
};

const orders = [{
        template: {},
        parts: ['get1']
    },
    {
        template: {},
        parts: ['get1', 'get3']
    },
];

const products = factory(library, orders);
console.log(products);