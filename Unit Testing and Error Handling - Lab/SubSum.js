function sumRange(arr = [], start, end) {
    if (!Array.isArray(arr)) {
        return NaN;
    } if (start < 0) {
        start = 0;
    } if (end > arr.length - 1) {
        end = arr.length - 1;
    }

    try {
        arr.forEach(num => {
            if (isNaN(parseInt(num))) {
                throw new TypeError();
            }
        })

        let sum = arr.slice(start, end + 1).reduce((x, y) => x + y, 0);
        return sum;

    } catch (error) {
        return NaN;
    }
}

sumRange([10, 20, 30, 40, 50, 60], 3, 300);
sumRange([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1);
sumRange([10, 'twenty', 30, 40], 0, 2);
sumRange([], 1, 2);
sumRange('text', 0, 2);