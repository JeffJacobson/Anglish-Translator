/**
 * @type {NodeListOf<HTMLTableRowElement>}
 */
const tabledata = document.querySelectorAll("table tbody tr");
const wordsDict = {};

function splitNsplice(/** @type {string} */ string /*, metric*/) {
    let array = string.split(",");
    array = array.splice(0, 1);
    array[0] = array[0].split(";")[0];
    return array;
}

for (let i = 3; i <= tabledata.length; i++) {
    const words = tabledata[i].querySelectorAll("td");
    let keyName = words[0].textContent;
    // this conditional is used instead when extracting data from the unattested column
    let values = "";
    if (words[3] != undefined) {
        values = words[3].textContent;
    }

    const keyNameRe = /[^a-zA-Z0-9 ]/g;
    // if(words[2] != undefined) {
    //     values = words[2].textContent;
    // }

    keyName = keyName.replace(keyNameRe, "");
    values = splitNsplice(values);
    values = values.toString();
    values = values.replace(keyNameRe, "");

    Object.assign(wordsDict, { [keyName]: values });

    if (i == tabledata.length - 1) {
        console.log(wordsDict);
    }
}
