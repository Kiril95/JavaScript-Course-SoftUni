function fromJSONToHTMLTable(input = {}) {
    let resultArr = [];
    const parsed = JSON.parse(input);
    resultArr.push('<table>');
    
    let header = ['   <tr>'];
    Object.keys(parsed[0]).map(key => {
        header.push(`<th>${escapeSpecialChars(key)}</th>`);
    });
    header.push('</tr>');
    resultArr.push(header.join(""));

    let rows = [];
    for (let info of Object.values(parsed)) {
        rows = [];
        rows.push('   <tr>')
        for (let current of Object.values(info)) {
            rows.push(`<td>${escapeSpecialChars(current)}</td>`);
        }
        rows.push('</tr>');
        resultArr.push(rows.join(""));
    }

    resultArr.push('</table>');
    console.log(resultArr.join('\n'));

    function escapeSpecialChars(value) {
        return value
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

fromJSONToHTMLTable(`[{"Name":"Stamat",
"Score":5.5},
{"Name":"Rumen",
"Score":6}]`);