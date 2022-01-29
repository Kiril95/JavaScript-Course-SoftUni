function parse(name, lastName, hairColor) {
    let obj = {
        name,
        lastName,
        hairColor,
    };

    console.log(JSON.stringify(obj));
}

parse('George', 'Jones', 'Brown')