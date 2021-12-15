function stars(count) {
    const row = "* ".repeat(count).trim()

    for (let i = 0; i < count; i++) {
        console.log(row)
    }
}

stars(5)
