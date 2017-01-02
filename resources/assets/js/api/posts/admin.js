import {AdminRepository} from './../Repositories'

class PostsAdminRepository extends AdminRepository {
    constructor() {
        super('admin/posts');
    }
}

export default new PostsAdminRepository();