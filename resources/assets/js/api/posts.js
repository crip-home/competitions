import {http} from 'vue'
import settings from './../store/settings'

export default {

    /**
     * Get posts from the server
     *
     * @param {number} [page]
     * @param {number} [per_page]
     * @param {array} [locales]
     */
    get(page = 1, per_page = 5, locales = null) {
        per_page = parseInt(per_page < 1 ? 5 : per_page);
        return new Promise((resolve, reject) => {
            const params = {page, per_page, locales: locales ? locales.join(',') : ''};
            http.get(settings.apiUrl('posts', params))
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(r, reject)
                );
        });
    },

    /**
     * Get single post from the server
     *
     * @param {number} id
     * @returns {Promise}
     */
    find(id) {
        return new Promise((resolve, reject) => {
            http.get(settings.apiUrl(`posts/${id}`))
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        })
    },

    /**
     * Store post on the server
     *
     * @param {object} post
     * @param {number} id
     * @returns {Promise}
     */
    save(post, id = 0) {
        return new Promise((resolve, reject) => {
            http.post(settings.apiUrl('admin/posts'), post)
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        });
    }

};