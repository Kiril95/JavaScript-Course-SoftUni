function extract(content) {
    let text = document.querySelector('#content').textContent;
    let words = text.match(/\(\w*.*?\)/g);
    words = words.join("; ");
    words = words.toString().replace(/[{(),}]/g, '').trim();

    return words;
}