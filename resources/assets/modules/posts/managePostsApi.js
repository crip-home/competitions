import AdminApi from './../../api/AdminApi'
import Post from './../../entities/Post'

class PostsAdminApi extends AdminApi {
  constructor () {
    super('admin/posts')
  }

  entityResolver (data) {
    return new Post(data)
  }
}

export default new PostsAdminApi()
