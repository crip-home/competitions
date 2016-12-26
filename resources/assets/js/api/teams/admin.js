import {http} from 'vue'
import settings from './../../store/settings'

export default {

    /**
     * Get teams from the server
     *
     * @param {number} [page]
     * @param {number} [per_page]
     */
    get(page = 1, per_page = 15) {
        per_page = parseInt(per_page < 1 ? 15 : per_page);
        return new Promise((resolve, reject) => {
            const params = {page, per_page};
            http.get(settings.apiUrl('admin/teams', params))
                .then(
                    ({data}) => resolve(data),
                    response => settings.handleError(response, reject)
                );
        });
    }

}