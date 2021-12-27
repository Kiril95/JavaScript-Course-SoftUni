function rectangle(w, h, c){

    return {
        width: w,
        height: h,
        color: c[0].toUpperCase() + c.slice(1),
        calcArea: function () {
            return this.width * this.height
        },
    };
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
