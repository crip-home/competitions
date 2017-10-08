import Wrapper from '@/Components/Wrapper.vue'
import * as routes from '@/Router/Routes'
import Login from './Login.vue'

export default {
  path: '/auth',
  component: Wrapper,
  children: [
    {path: 'login', ...routes.login, component: Login},
  ]
}
