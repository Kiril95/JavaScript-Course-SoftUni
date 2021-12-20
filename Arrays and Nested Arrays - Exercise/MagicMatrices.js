function magic(matrix) {
    let neededSum = matrix[0].reduce((x, y) => x + y);
    let areMagical = true;
    let colSum = 0;
    for (let i = 0; i < matrix.length; i++) {
        let rowSum = matrix[i].reduce((x, y) => x + y);

        if (rowSum !== neededSum) {
            areMagical = false;
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            colSum += matrix[j][i];
        }

        if (colSum !== neededSum) {
            areMagical = false;
        }
        colSum = 0;
    }

    console.log(areMagical);
}

magic(
    [[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]])