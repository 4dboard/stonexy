/**
 * Retrieve the mods based on environment variables.
 * @returns {object} - The mods object.
 */
module.exports = {
    check: (data: any) => data && data !== 'false' && data !== '0' && data !== 'undefined' && data !== 'null' && data !== 'NaN' && data !== '' && data !== '[]' && data !== '{}',
    mods: () => {
        const modNames = process.env.MODS.split(',');
        const modsArray = modNames
            .map((mod) => require(`../mods/${mod.trim()}`))
            .filter((mod) => mod !== null);
        const replaceData = JSON.parse(process.env.REPLACE || '{}');
        return modsArray.reduce((result, mod) => ({...result, ...mod}), replaceData);
    }
}