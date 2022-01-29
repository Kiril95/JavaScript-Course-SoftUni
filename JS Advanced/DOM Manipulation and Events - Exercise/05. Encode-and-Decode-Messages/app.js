function encodeAndDecodeMessages() {
    let encodeField = document.querySelector('#main > div:nth-child(1) > textarea');
    let encodeButton = document.querySelector('#main > div:nth-child(1) > button');

    let decodeField = document.querySelector('#main > div:nth-child(2) > textarea');
    let decodeButton = document.querySelector('#main > div:nth-child(2) > button');
    let encodedString = '';
    let decodedString = '';

    encodeButton.addEventListener('click', function () {
        encodedString = '';
        for (let i = 0; i < encodeField.value.length; i++) {
            let char = encodeField.value[i].charCodeAt() + 1;
            let convert = String.fromCodePoint(char);
            encodedString += convert;
        }

        //decodeField.disabled = false;
        encodeField.value = '';
        decodeField.value = encodedString;
    });

    decodeButton.addEventListener('click', function () {
        decodedString = '';
        for (let i = 0; i < decodeField.value.length; i++) {
            let char = decodeField.value[i].charCodeAt() - 1;
            let convert = String.fromCodePoint(char);
            decodedString += convert;
        }

        decodeField.value = decodedString;
    });
}