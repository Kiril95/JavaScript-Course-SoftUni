function parsing(text) {
    let obj = JSON.parse(text);

    for (let [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
    }
}

parsing('{"name": "George", "age": 40, "town": "Sofia"}')