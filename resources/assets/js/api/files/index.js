import { http } from 'vue'
import settings from '../../settings'

export default {
  upload (file) {
    let formData = new FormData()
    formData.append('file', file)

    return new Promise((resolve, reject) => {
      http.post(settings.apiUrl('admin/files'), formData)
        .then(({data}) => resolve(data))
        .catch(({data: error}) => reject(error))
    })
  }
}
