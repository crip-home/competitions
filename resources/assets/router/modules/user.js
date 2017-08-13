import { profileRoute } from '../routes'
import Wrapper from '../../Wrapper.vue'
import Profile from '../../components/user/Profile.vue'

export default {
  path: '/user',
  component: Wrapper,
  children: [
    {path: 'profile/:id?', ...profileRoute, component: Profile}
  ]
}
