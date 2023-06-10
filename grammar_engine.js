import {wordbook} from "./wordbook.js"

/**
 * Converts a word to its singular form, then to its plural form.
 * @param {string} word 
 * @returns {string | undefined}
 */
export function singulariseThenPluralise(word) {
    if (word.endsWith('ies')) {
        word = word.substring(0, word.length - 3) + 'y';
    } else if (word.endsWith('s')) {
        word = word.substring(0, word.length - 1);
    } else if (word.endsWith('es')) {
        word = word.substring(0, word.length - 2);
    } else {
        word = "";
    }

    if (word != "") {
        if (word in wordbook) {
            word = pluralise(wordbook[word]);
        } else {
            word = "";
        }
    }

    if(word != "") {
        return word;
    } else {
        return undefined;
    }
}

/**
 * 
 * @param {string} word 
 * @returns {string | undefined}
 */
function pluralise(word) {
    if (word.endsWith('y')) {
        word = word.substring(0, word.length - 1) + 'ies';
    } else if (!word.endsWith('s')) {
        word = word + 's';
    } else {
        word = "";
    }

    if(word != "") {
        return word;
    } else {
        return undefined;
    }
}

/**
 * 
 * @param {string} word 
 * @returns {string | undefined}
 */
export function presentContinuous(word) {
    if (word.endsWith('ing')) {
        word = word.substring(0, word.length - 3);
    } else {
        // not present continious;
        return undefined;
    }

    if (word != "") {
        if (word in wordbook) {
            word = wordbook[word] + "ing";
            
        } else {
            
            if (word+"e" in wordbook){
                const wordWithoutE = wordbook[word+"e"].substring(0, wordbook[word+"e"].length - 1)
                word = wordWithoutE + "ing";
            } else {
                word = ""
            }
        }
    }

    if(word != "") {
        return word;
    } else {
        return undefined;
    }
}


/**
 * 
 * @param {string} word 
 * @returns {string | undefined}
 */
function toPastTense(word) {
    if (!word.endsWith('ed')) {
        if (word.endsWith('y')) {
            word[word.length - 1] = 'i';
        }
        if(word.endsWith('e')) {
            word+='d'
        } else {
            word+="ed"

        }

    } else {
        word = "";
    }
    if(word != "") {
        return word;
    } else {
        return undefined;
    }
}

/**
 * 
 * @param {string} word 
 * @returns {string | undefined}
 */
export function toPresentTenseThenPastTense(word) {
    const originalWord = word;

    if (word.endsWith('ed')) {
        word = word.substring(0, word.length - 2);
        if (word in wordbook == false) {
            if (originalWord.endsWith('d')) {
                word = originalWord.substring(0, originalWord.length - 1);
            } else {
                word = "";
            }
        }
    } else {
        word = "";
    }

    if (word != "") {

        if (word in wordbook) {
            word = toPastTense(wordbook[word]);

        } else {
            word = "";
        }
    }

    if(word != "") {
        return word;
    } else {
        return undefined;
    }
}
