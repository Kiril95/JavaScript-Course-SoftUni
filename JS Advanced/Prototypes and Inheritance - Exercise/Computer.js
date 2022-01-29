function createComputerHierarchy() {
    class Manufacturer {
        constructor(manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Manufacturer {
        constructor(manufacturer, responseTime) {
            super(manufacturer)
            this.responseTime = Number(responseTime);
        }
    }

    class Monitor extends Manufacturer {
        constructor(manufacturer, width, height) {
            super(manufacturer)
            this.width = Number(width);
            this.height = Number(height);
        }
    }

    class Battery extends Manufacturer {
        constructor(manufacturer, expectedLife) {
            super(manufacturer)
            this.expectedLife = Number(expectedLife);
        }
    }

    class Computer extends Manufacturer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error('Abstract classes cannot be instantiated!')
            }
            super(manufacturer)
            this.processorSpeed = Number(processorSpeed);
            this.ram = Number(ram);
            this.hardDiskSpace = Number(hardDiskSpace);
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.weight = Number(weight);
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }
        set battery(value) {
            if (!(value instanceof Battery)) {
                throw new TypeError(`${value.constructor.name} is not a correct instance for the ${this.constructor.name} class!`);
            }
            this._battery = value;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }
        set keyboard(value) {
            if (!(value instanceof Keyboard)) {
                throw new TypeError(`${value.constructor.name} is not a correct instance for the ${this.constructor.name} class!`);
            }
            this._keyboard = value;
        }

        get monitor() {
            return this._monitor;
        }
        set monitor(value) {
            if (!(value instanceof Monitor)) {
                throw new TypeError(`${value.constructor.name} is not a correct instance for the ${this.constructor.name} class!`);
            }
            this._monitor = value;
        }
    }

    return { Battery, Keyboard, Monitor, Computer, Laptop, Desktop }
}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy', 3);
console.log(battery);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
console.log(laptop);

let keyboard = new Keyboard('Acer', 55, 2);
let monitor = new Keyboard('Wizz', 66, 3);
console.log(keyboard);
console.log(monitor);

let desktop = new Desktop('HP', 2, 3, 4, keyboard, monitor); // Should throw error!