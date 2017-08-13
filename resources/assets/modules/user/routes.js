import { profileRoute } from '../../router/routes'
import Wrapper from '../../Wrapper.vue'
import Profile from './Profile.vue'

export default {
  path: '/user',
  component: Wrapper,
  children: [
    {path: 'profile/:id?', ...profileRoute, component: Profile}
  ]
}
