function validate(x1, y1, x2, y2) {
    compareCoordinates(x1, y1, 0, 0);
    compareCoordinates(x2, y2, 0, 0);
    compareCoordinates(x1, y1, x2, y2);

    function compareCoordinates(x1, y1, x2, y2) {
        let compare = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

        if (compare == compare.toFixed(0)) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        }
        else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }
}

validate(3, 0, 0, 4)
validate(2, 1, 1, 1)