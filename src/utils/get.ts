const {globals} = require('./globals');
/**
 * Get the domain part of a URL.
 * @param {string} url - The URL to extract the domain from.
 * @returns {string} - The domain part of the URL.
 */

module.exports = {
    canonical: (hostname: any) => {
        const parts = hostname.split('.');
        let lastIndex = parts.length - 1;

        for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i].length > 3) {
                lastIndex = i;
                break;
            }
        }

        return parts.slice(lastIndex).join('.');
    },
    subdir: (url: any) => {
        const host = globals.get('host');
        const {hostname, pathname, search, hash} = new URL(url);
        const parts = hostname.split('.');
        const subdirectories = parts.length > 2 ? `/_${parts.slice(0, -2).join('/')}` : ''; // Use slice(-2) to exclude the last two parts
        return `//${host}${subdirectories}${pathname}${search}${hash}`.replace(/\/+$/, '');
    },
    domain: (url: any) => (url.match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i) || [])[1]
};
