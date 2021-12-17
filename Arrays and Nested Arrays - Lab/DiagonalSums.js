function diagonal(matrix) {
    let primarySum = 0;
    let secondarySum = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i === j) {
                primarySum += Number(matrix[i][j]);
            }

            if ((i + j) === (matrix.length - 1)) {
                secondarySum += matrix[i][j];
            }
        }
    }
    console.log(`${primarySum} ${secondarySum}`);
}

diagonal([[20, 40],
[10, 60]])

diagonal([[3, 5, 17],
[-1, 7, 14],
[1, -8, 89]])            