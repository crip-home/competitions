export default {
    apiRoot: '/api/',
    /**
     * @param {string} path
     * @returns {string}
     */
    apiUrl(path) {
        let url = path.replace(new RegExp("^[\\/]+"), '');
        return `${this.apiRoot}${url}`;
    },

    handleError(errorResponse) {
        console.log('settings.handleError', errorResponse);
    }
}