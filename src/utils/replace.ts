/**
 * Import dependencies
 */
const {check} = require('./data');
const {canonical, subdir} = require('./get');
const targetRegex = new RegExp(`https:\\/\\/([A-Za-z0-9](?:(?:[-A-Za-z0-9]){0,61}[A-Za-z0-9]))\\.${canonical(process.env.TARGET)}`, 'g');

/**
 * Applies a series of transformations to the input text 'c' using the provided 'd' data object.
 * @param {string} c - The input text to be transformed.
 * @param {Object} d - The data object used for transformations.
 * @returns {string} - The transformed text.
 */
function multi(c, d) {
    // Replace occurrences of keys in 'd' with their corresponding values in 'c'
    c = c.replaceAll(new RegExp(Object.keys(d).join('|'), 'g'), (m) => d[m]);

    // Check if CSS data is available and insert CSS code into the HTML 'c'
    if (check(process.env.CSS)) {
        c = c.replace('</head>', `<style>${process.env.CSS}</style></head>`);
    }

    // Check if JavaScript data is available and insert JavaScript code into the HTML 'c'
    if (check(process.env.JS)) {
        c = c.replace('</body>', `<script>${process.env.JS}</script></body>`);
    }

    // Check if analytics data is available and replace placeholders in 'c' with the actual analytics code
    if (check(process.env.ANALYTICS)) {
        c = c.replaceAll(/[A-Z][A-Z0-9]?-[A-Z0-9]{4,10}(?:-[1-9]d{0,3})?/g, process.env.ANALYTICS);
    }

    // Check if SUBS data is available and replace specific URLs in 'c' based on environment settings
    if (check(process.env.SUBS)) {
        c = c.replace(targetRegex, (match) => subdir(match));
    }

    return c;
}

module.exports = {multi};