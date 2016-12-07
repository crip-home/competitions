import {http} from 'vue'
import settings from './../../store/settings'

export default {

    /**
     * Get posts from the server
     *
     * @param {number} [page]
     * @param {number} [per_page]
     */
    get(page = 1, per_page = 15) {
        per_page = parseInt(per_page < 1 ? 15 : per_page);
        return new Promise((resolve, reject) => {
            const params = {page, per_page};
            http.get(settings.apiUrl('admin/posts', params))
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
            http.get(settings.apiUrl(`admin/posts/${id}`))
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
     * @returns {Promise}
     */
    save(post) {
        let method = 'post';
        let url = 'admin/posts';

        if(post.id > 0) {
            method = 'put';
            url = `admin/posts/${post.id}`;
        }

        return new Promise((resolve, reject) => {
            http[method](settings.apiUrl(url), post)
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        });
    },
}