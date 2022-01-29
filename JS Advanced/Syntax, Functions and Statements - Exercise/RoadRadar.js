function speedRadar(currentSpeed, terrain) {
    const limits = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20,
    }

    if (currentSpeed <= limits[terrain]) {
        console.log(`Driving ${currentSpeed} km/h in a ${limits[terrain]} zone`);

    } else {
        let difference = currentSpeed - limits[terrain];
        const getStatus = n => {
            const status = {
                [n > 40]: "reckless driving",
                [n > 20 && n <= 40]: "excessive speeding",
                [n <= 20]: "speeding",
            }

            return status[true];
        }

        console.log(`The speed is ${difference} km/h faster than the allowed speed of ${limits[terrain]} - ${getStatus(difference)}`);
    }
}

speedRadar(40, 'city')
speedRadar(21, 'residential')
speedRadar(120, 'interstate')