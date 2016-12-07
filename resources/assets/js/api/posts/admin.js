import {http} from 'vue'
import settings from './../../store/settings'

export default {

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
    },
}