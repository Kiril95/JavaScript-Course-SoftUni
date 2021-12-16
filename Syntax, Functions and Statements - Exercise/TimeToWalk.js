function walkTime(steps, footSize, speed) {
    const distance = steps * footSize;
    const decimalTime = distance / 1000 / speed;
    const result = new Date(0, 0);
    result.setSeconds(Math.round(decimalTime * 60 * 60));
    result.setMinutes(result.getMinutes() + Math.floor(distance / 500));

    console.log(result.toTimeString().slice(0, 8));
}

walkTime(4000, 0.60, 5)
walkTime(2564, 0.70, 5.5)