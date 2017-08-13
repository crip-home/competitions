import api from '../../api/index'
import User from '../../entities/User'
import manageUsersApi from './manageUsersApi'

export const manageUsers = manageUsersApi

export const users = {
  profile (id = 0) {
    let url = 'user/profile' + (id > 0 ? `/${id}` : '')
    return api.find(url, data => new User(data))
  }
}
