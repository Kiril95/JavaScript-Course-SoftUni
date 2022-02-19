class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        let { firstName, lastName, personalId } = customer;
        personalId = Number(personalId);

        if (this.allCustomers.find(x => x.personalId == personalId)) {
            throw new Error(`${firstName} ${lastName} is already our customer!`);
        }

        let person = { firstName, lastName, personalId, transactions: [] };
        this.allCustomers.push(person);

        return person;
    }

    depositMoney(personalId, amount) {
        personalId = Number(personalId);
        amount = Number(amount);
        let targetCustomer = this.allCustomers.find(x => x.personalId == personalId);

        if (!targetCustomer) {
            throw new Error(`We have no customer with this ID!`);
        }

        if (!targetCustomer.hasOwnProperty('totalMoney')) {
            targetCustomer.totalMoney = 0;
        }

        targetCustomer['totalMoney'] += amount;
        targetCustomer.transactions.unshift(`${targetCustomer.firstName} ${targetCustomer.lastName} made deposit of ${amount}$!`);
        return `${targetCustomer.totalMoney}$`;
    }

    withdrawMoney(personalId, amount) {
        personalId = Number(personalId);
        amount = Number(amount);
        let targetCustomer = this.allCustomers.find(x => x.personalId == personalId);

        if (!targetCustomer) {
            throw new Error(`We have no customer with this ID!`);
        }

        if (targetCustomer.totalMoney < amount) {
            throw new Error(`${targetCustomer.firstName} ${targetCustomer.lastName} does not have enough money to withdraw that amount!`);
        }

        targetCustomer.totalMoney -= amount;
        targetCustomer.transactions.unshift(`${targetCustomer.firstName} ${targetCustomer.lastName} withdrew ${amount}$!`);
        return `${targetCustomer.totalMoney}$`;
    }

    customerInfo(personalId) {
        personalId = Number(personalId);
        let targetCustomer = this.allCustomers.find(x => x.personalId == personalId);
        let output = [];

        if (!targetCustomer) {
            throw new Error(`We have no customer with this ID!`);
        }

        output.push(`Bank name: ${this._bankName}`);
        output.push(`Customer name: ${targetCustomer.firstName} ${targetCustomer.lastName}`);
        output.push(`Customer ID: ${targetCustomer.personalId}`);
        output.push(`Total Money: ${targetCustomer.totalMoney}$`);
        output.push(`Transactions:`);

        let count = targetCustomer.transactions.length;
        //targetCustomer.transactions.reverse();
        targetCustomer.transactions.forEach(info => {
            output.push(`${count}. ${info}`);
            count--;
        });

        return output.join('\n');
    }
}

let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: 'Mihaela', lastName: 'Mileva', personalId: 4151596 }));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));