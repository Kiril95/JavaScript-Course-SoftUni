function matrix(matrix) {
    let combined = [];
    for (let row of matrix) {
        for (element of row) {
            combined.push(element)
        }
    };
    //let otherWay = matrix.join().split(", ");

    return biggest = combined.sort((x, y) => y - x)[0];
}

matrix([[20, 50, 10], [8, 33, 145]])
matrix([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]])
matrix([[3, 5, 17, 12, 91, 5], [-1, 7, 4, 33, 6, 22], [1, 8, 99, 3, 10, 43]])