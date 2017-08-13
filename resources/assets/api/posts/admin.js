import AdminApi from './../AdminApi'
import Post from '../../entities/Post'

class PostsAdminApi extends AdminApi {
  constructor () {
    super('admin/posts')
  }

  static entityResolver (data) {
    return new Post(data)
  }
}

export default new PostsAdminApi()
