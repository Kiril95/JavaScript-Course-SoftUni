function createSortedList() {
    class SortedList {
        constructor() {
            this.sortedList = []
            this.size = 0
        }

        validate = index => {
            if (this.sortedList[index] === undefined) {
                throw new Error();
            }
        }

        add = element => {
            this.sortedList.push(element);
            this.size++;
            this.sortedList.sort((x, y) => x - y);
        }

        remove = index => {
            this.validate(index);
            this.sortedList.splice(index, 1);
            this.size--;
            this.sortedList.sort((x, y) => x - y);
        }

        get = index => {
            this.validate(index);
            index = Number(index);
            return this.sortedList[index];
        }
    }
    return new SortedList;
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
console.log(list.size);
