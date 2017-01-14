import {error} from './ext/Log'

export default {
    apiRoot: '/api/',

    /**
     * 'console' - logs all to the browser console
     */
    logs: 'console',

    /**
     * To disable logs for some section, remove it from this list
     * To disable all logs, change logs property value to false
     * or make logSections list empty
     */
    logSections: [
        'global',
        //// 'select2', // Uncomment this line to see all changes in select2 helper
    ],

    /**
     * @param {string} path         Request path
     * @param {object} [params]     Parameters to be included in URL
     * @param {object} [urlReplace] Url placeholders should be replaced with variable values
     * @returns {string} Absolute API url
     */
    apiUrl(path, params = {}, urlReplace = {}) {
        let url = path.replace(new RegExp("^[\\/]+"), '');
        url = `${this.apiRoot}${url}`;
        url = url.supplant(urlReplace);

        Object.keys(params).forEach(index => {
            let val = params[index];
            if (typeof val !== 'undefined' && val !== '')
                url = this.addParameter(url, index, val);
        });

        return url;
    },

    /**
     * Global handler of HTTP error responses
     *
     * @param {object} errorResponse
     * @param {function} [reject]
     */
    handleError(errorResponse, reject = _ => _) {
        if (reject && typeof reject === 'function') {
            reject(errorResponse.data);
        }

        error('settings.handleError', errorResponse);
    },

    addParameter(url, param, value) {
        // Using a positive lookahead (?=\=) to find the
        // given parameter, preceded by a ? or &, and followed
        // by a = with a value after than (using a non-greedy selector)
        // and then followed by a & or the end of the string
        const val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))');
        const parts = url.toString().split('#');
        const hash = parts[1];
        const qstring = /\?.+$/;
        let newURL = url = parts[0];

        // Check if the parameter exists
        if (val.test(url)) {
            // if it does, replace it, using the captured group
            // to determine & or ? at the beginning
            newURL = url.replace(val, '$1' + param + '=' + value);
        }
        else if (qstring.test(url)) {
            // otherwise, if there is a query string at all
            // add the param to the end of it
            newURL = url + '&' + param + '=' + value;
        }
        else {
            // if there's no query string, add one
            newURL = url + '?' + param + '=' + value;
        }

        if (hash)
            newURL += '#' + hash;

        return newURL;
    }
}