function dictionary(inputArr = []) {
    let resultArr = [];
    let resultObj = {};

    for (let line of inputArr) {
        let parsed = JSON.parse(line);
        let keyValuePair = Object.entries(parsed);

        for (let [key, definition] of keyValuePair) {
            resultObj[key] = definition;
        }
    }

    for (let item in resultObj) {
        let obj = {
            'term': item,
            'definition': resultObj[item]
        }
        resultArr.push(obj);
    }

    let sorted = resultArr.sort((a, b) => a.term.localeCompare(b.term));
    sorted.forEach(x => console.log(`Term: ${x.term} => Definition: ${x.definition}`))
}

dictionary([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}',
    '{"Coffee":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'])