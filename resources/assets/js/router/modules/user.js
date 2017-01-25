import { messages } from './../routes'

import ChildHolder from './../../components/ChildHolder.vue'
import Messages    from './../../components/user/Messages.vue'

const meta = {requiresAuth: true}
export default {
  path: '/user',
  component: ChildHolder,
  children: [
    {path: 'messages', ...messages, component: Messages, meta}
  ]
}
