import {http} from 'vue'
import settings from './../store/settings'

export class AdminRepository {
    constructor(path) {
        this.path = path;
    }

    /**
     * Get list of entities from the server
     *
     * @param {number} [page]
     * @param {number} [per_page]
     */
    get(page = 1, per_page = 15) {
        per_page = parseInt(per_page < 1 ? 15 : per_page);
        return new Promise((resolve, reject) => {
            const params = {page, per_page};
            http.get(settings.apiUrl(this.path, params))
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        });
    }

    /**
     * Get single entity from the server
     *
     * @param {number} id
     * @returns {Promise}
     */
    find(id) {
        return new Promise((resolve, reject) => {
            http.get(settings.apiUrl(`${this.path}/${id}`))
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        })
    }

    /**
     * Store entity on the server
     *
     * @param {object} entity
     * @returns {Promise}
     */
    save(entity) {
        let method = 'post';
        let url = this.path;

        if(entity.id > 0) {
            method = 'put';
            url = `${this.path}/${entity.id}`;
        }

        return new Promise((resolve, reject) => {
            http[method](settings.apiUrl(url), entity)
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        });
    }
}