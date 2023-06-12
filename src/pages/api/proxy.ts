/**
 * Import dependencies
 */
import {createProxyMiddleware, responseInterceptor} from 'http-proxy-middleware';

const {canonical} = require('../../utils/get');
const {globals} = require('../../utils/globals');
const {intercept} = require('../../utils/intercept');
const {check} = require('../../utils/data');

/**
 * Create and export the proxy middleware
 * @param {object} a - Request object
 * @param {object} b - Response object
 * @returns {function} - Proxy middleware
 */
module.exports = async (a: any, b: any) =>
    createProxyMiddleware({
        changeOrigin: true,
        on: {
            /**
             * Event handler for proxyRes event
             * @param {object} c - Proxy response object
             * @param {object} d - Incoming message object
             * @returns {Promise<any>} - Modified response data or intercepted data
             */
            proxyRes: responseInterceptor(async (c, d) => {
                try {
                    return await intercept(d, c);
                } catch (e) {
                    return (c)
                }
            }),
        },
        router: async function (a: any): Promise<string> {
            globals.set('host', a.headers.host);
            globals.set('url', a.url);

            const url = new URL(a.url, process.env.TARGET);

            try {

                if (process.env.AFFILIATE_KEY && process.env.AFFILIATE_VALUE) {
                    const {AFFILIATE_KEY, AFFILIATE_VALUE} = process.env;
                    url.searchParams.append(AFFILIATE_KEY, AFFILIATE_VALUE);
                }

                if (check(process.env.SUBS)) {
                    url.pathname = url.pathname.replace(/\/_([^/]+)/g, (sub) => {
                        const replacedSub = sub.replace(/[/|_]/g, '');
                        url.hostname = replacedSub + '.' + canonical(url.hostname);
                        return '';
                    });
                }
            } catch (e) {
                return a.url;
            }

            return url.href;
        },
        selfHandleResponse: true,
        target: process.env.TARGET,
    })(a, b);
