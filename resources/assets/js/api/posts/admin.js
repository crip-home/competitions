import { AdminRepository } from '../../ext/Repositories'
import Post                from '../Post'

class PostsAdminRepository extends AdminRepository {
  constructor () {
    super('admin/posts')
  }

  entityResolver (data) {
    return new Post(data)
  }
}

export default new PostsAdminRepository()
