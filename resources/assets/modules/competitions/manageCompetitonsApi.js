import AdminApi from './../../api/AdminApi'
import Post from './../../entities/Post'

class CompetitionsAdminApi extends AdminApi {
  constructor () {
    super('admin/competitions')
  }

  entityResolver (data) {
    return new Post(data)
  }
}

export default new CompetitionsAdminApi()
