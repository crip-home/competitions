import { messages, message } from './../routes'

import ChildHolder from '../../components/ChildHolder.vue'
import Messages    from '../../components/user/Messages.vue'
import Message     from '../../components/user/MessageModal.vue'

const meta = {requiresAuth: true}
export default {
  path: '/user',
  component: ChildHolder,
  children: [
    {
      path: 'messages/:page?',
      ...messages,
      component: Messages,
      meta,
      children: [
        {path: 'read/:id', ...message, component: Message, meta}
      ]
    }
  ]
}
