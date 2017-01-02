import {AdminRepository} from './../Repositories'

class TeamsAdminRepository extends AdminRepository {
    constructor() {
        super('admin/teams');
    }
}

export default new TeamsAdminRepository();