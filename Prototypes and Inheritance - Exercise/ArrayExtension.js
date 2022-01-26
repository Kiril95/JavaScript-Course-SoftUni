(function solve() {
    Array.prototype.last = function(){
        return this[this.length - 1];
    }
    Array.prototype.skip = function(n){
        let newArr = [];
        for (let i = n; i < this.length; i++) {
            newArr.push(this[i]);
        }
        return newArr;
    }
    Array.prototype.take = function(n){
        let newArr = [];
        for (let i = 0; i < n; i++) {
            newArr.push(this[i]);
        }
        return newArr;
    }
    Array.prototype.sum = function(){
        return this.reduce((x, y) => x + y, 0);
    }
    Array.prototype.average = function(){
        return this.sum() / this.length;
    }
})();