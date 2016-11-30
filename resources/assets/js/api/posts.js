import {http} from 'vue'
import settings from './../store/settings'

export default {

    /**
     * Get posts from the server
     *
     * @param {number} page
     * @param {array|null} locales
     */
    get(page = 1, locales = null) {
        return new Promise((resolve, reject) => {
            const params = {page, locales: locales ? locales.join(',') : ''};
            http.get(settings.apiUrl('posts', params))
                .then(({data}) => {
                    resolve(data);
                }, r => settings.handleError(r, reject));
        });
    }

};