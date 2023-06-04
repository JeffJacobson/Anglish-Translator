/**
 * Extracts words from the Anglish Wordbook.
 */

import { JSDOM } from "jsdom";

const defaultWordbookUrl = "https://anglish.fandom.com/wiki/English_Wordbook";

/**
 * Fetches wordbook for a letter and then extracts
 * word definitions from the HTML response.
 * @param {string} letter 
 * @param {string} wordbookUrl 
 * @returns {[string, string]}
 */
async function getWordsForLetter(letter, wordbookUrl=defaultWordbookUrl) {
    const letterUrl = `${wordbookUrl}/${letter}`;
    const response = await fetch(letterUrl);
    const html = await response.arrayBuffer();
    const jsdom = new JSDOM(html);
    // console.debug(jsdom);
    const htmlBody = jsdom.window.document.body;
    // console.debug(htmlBody);
    const row = [...getWords(htmlBody)];
    // console.log(row);
    return [letter, row];
}

/**
 *
 * @param {HTMLBodyElement} htmlBody
 * @returns {Generator<[string, string, string, string], void, unknown>}
 */
function* getWords(htmlBody) {
    const rows = htmlBody.querySelectorAll("table tr");
    for (const row of rows) {
        if (row.cells.length !== 4) {
            continue;
        }
        yield [...row.cells].map((td) => td.textContent).map(t => t?.replace(/\n+$/, ""));
    }
}


const pages = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map(l => getWordsForLetter(l));

const rows = (await Promise.allSettled(pages)).map(p => p.value).map(kvp => kvp[1])


console.log(rows);