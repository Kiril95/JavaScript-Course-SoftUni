function previousDate(year, month, day) {
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);

    console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

previousDate(2016, 9, 30)
previousDate(2016, 10, 1)