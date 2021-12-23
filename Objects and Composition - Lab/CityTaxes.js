function solve(name, population, treasury) {
    const city = {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes() {
            this.treasury += this.population * this.taxRate;
        },
        applyGrowth(percentage) {
            Math.floor(this.population += (this.population * percentage) / 100);
        },
        applyRecession(percentage) {
            Math.floor(this.treasury -= (this.treasury * percentage) / 100);
        }
    };

    return city;
}

const city =
    solve('Tortuga',
        7000,
        15000);
console.log(city);