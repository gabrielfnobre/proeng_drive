/**
 * @description
 * A global function that captalize a string with a length bigger than 2 characters
 * @param {string} word String to captalize
 */
export function captalize(word){
    if(!(typeof word === 'string')){
        if(word.includes(' ')){
            word = word.split(' ')
                .map(w => w.length <= 3 && w.charAt(0) === 'd' ? w : (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
                .join(' ');
            return word;
        } else {
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return word;
        }
    } else {
        word = '' + word;
        if(word.includes(' ')){
            word = word.split(' ')
                .map(w => w.length <= 3 && w.charAt(0) === 'd' ? w : (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
                .join(' ');
            return word;
        } else {
            word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            return word;
        }
    }
}