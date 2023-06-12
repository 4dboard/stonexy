/**
 * The global object used for storing and accessing global variables.
 * It provides methods to get and set values in the global object.
 */
let glob: object = {};

// Export the globals module for external use.
module.exports = {
    globals: {
        /**
         * Retrieves the value associated with the specified key from the global object.
         * @param {string} key - The key to retrieve the value for.
         * @returns {any} - The value associated with the key.
         */
        get: (key: string) => eval(`${glob}.${key}`),

        /**
         * Sets the provided value for the specified key in the global object.
         * @param {string} key - The key to set the value for.
         * @param {any} value - The value to assign to the key.
         */
        set: (key: string, value: any) => eval(`${glob}.${key} = ${value}`)
    }
};