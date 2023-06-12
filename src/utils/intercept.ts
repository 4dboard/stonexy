const {multi} = require('./replace');
const {mods} = require('./data');
const Jimp = require('jimp');
/**
 * Process an image buffer using Jimp library.
 * @param {Buffer} buffer - The image buffer to process.
 * @returns {Promise<Buffer>} - The processed image buffer.
 * @throws {Error} - If an error occurs during image processing.
 */
const image = async (buffer) => {
    try {
        const jimpImage = await Jimp.read(buffer);
        const processedImage = jimpImage.flip(true, false).sepia().pixelate(1);
        return processedImage.getBufferAsync(Jimp.AUTO);
    } catch (error) {
        // Handle error here
        console.error('Error processing image:', error);
        throw error;
    }
};

/**
 * Convert text using the 'multi' function from the 'replace' module and the 'mods' function from the 'data' module.
 * @param {Buffer} buffer - The text buffer to convert.
 * @returns {string} - The converted text.
 * @throws {Error} - If an error occurs during text conversion.
 */
const text = (buffer) => {
    try {
        return multi(buffer.toString('utf8'), mods());
    } catch (error) {
        // Handle error here
        console.error('Error converting text:', error);
        throw error;
    }
};

/**
 * Passes through the buffer without any modifications.
 * @param {Buffer} buffer - The buffer to handle.
 * @returns {Buffer} - The same input buffer.
 */
const other = (buffer) => buffer;

/**
 * Intercept function that determines the content type of the response and calls the appropriate processing function.
 * @param {Object} response - The response object.
 * @param {Buffer} buffer - The buffer to intercept.
 * @returns {Promise<Buffer|string>} - The processed buffer or converted text.
 */
const intercept = async (response, buffer) => {
    const contentType = response.headers['content-type'];

    if (contentType && contentType.includes('image') && !contentType.includes('webp') && !contentType.includes('svg')) {
        return image(buffer);
    } else if (contentType && contentType.includes('text') && !contentType.includes('javascript')) {
        return text(buffer);
    } else {
        return other(buffer);
    }
};

module.exports = {image, text, other, intercept};