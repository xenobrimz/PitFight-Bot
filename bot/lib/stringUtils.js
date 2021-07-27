/**
 * removes all non alphabet, number, and space chars
 * 
 * @param {*} str 
 * @returns 
 */
export function removeAllSpecialChars(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
}
