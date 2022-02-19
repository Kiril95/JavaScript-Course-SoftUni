class LibraryCollection {
    constructor(capacity) {
        this.capacity = capacity;
        this.books = [];
    }

    addBook(bookName, bookAuthor) {
        if (this.books.length >= this.capacity) {
            throw new Error("Not enough space in the collection.");
        }

        let book = { bookName, bookAuthor, payed: false };
        this.books.push(book);

        return `The ${bookName}, with an author ${bookAuthor}, collect.`;
    }

    payBook(bookName) {
        let targetBook = this.books.find(x => x.bookName == bookName);

        if (!targetBook) {
            throw new Error(`${bookName} is not in the collection.`);
        }
        if (targetBook.payed == true) {
            throw new Error(`${bookName} has already been paid.`);
        }

        targetBook.payed = true;
        return `${bookName} has been successfully paid.`;
    }

    removeBook(bookName) {
        let targetBook = this.books.find(x => x.bookName == bookName);

        if (!targetBook) {
            throw new Error(`The book, you're looking for, is not found.`);
        }
        if (targetBook.payed == false) {
            throw new Error(`${bookName} need to be paid before removing from the collection.`);
        }

        let index = this.books.indexOf(targetBook);
        this.books.splice(index, 1);

        return `${bookName} remove from the collection.`;
    }

    getStatistics(bookAuthor) {
        if (bookAuthor !== undefined) {
            let targetBook = this.books.find(x => x.bookAuthor == bookAuthor);

            if (targetBook) {
                let check = targetBook.payed == true ? 'Has Paid' : 'Not Paid';

                return `${targetBook.bookName} == ${targetBook.bookAuthor} - ${check}.`
            } else {
                throw new Error(`${bookAuthor} is not in the collection.`);
            }
        }

        let output = [];
        output.push(`The book collection has ${this.capacity - this.books.length} empty spots left.`);
        this.books.sort((x, y) => x.bookName.localeCompare(y.bookName));

        Object.values(this.books).forEach(info => {
            let check = info.payed == true ? 'Has Paid' : 'Not Paid';
            
            output.push(`${info.bookName} == ${info.bookAuthor} - ${check}.`);
        })
        

        return output.join('\n');
    }
}

const library = new LibraryCollection(5)
library.addBook('Don Quixote', 'Miguel de Cervantes');
library.payBook('Don Quixote');
library.addBook('In Search of Lost Time', 'Marcel Proust');
library.addBook('Ulysses', 'James Joyce');
console.log(library.getStatistics());