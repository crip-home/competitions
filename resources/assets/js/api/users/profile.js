import api from '../../api'
import User from '../../entities/User'

export default {
  find (id = 0) {
    let url = 'user/profile' + (id > 0 ? `/${id}` : '')
    return api.find(url, data => new User(data))
  }
}
