import {
  messagesRoute,
  messageRoute,
  newMessageRoute
} from '../../router/routes'

import Wrapper from '../../Wrapper.vue'
import Messages from './Messages.vue'
import Message from './MessageModal.vue'
import NewMessage from './NewMessageModal.vue'

const meta = {requiresAuth: true}
export default {
  path: '/messages',
  component: Wrapper,
  children: [
    {
      path: ':type/:page?',
      ...messagesRoute,
      component: Messages,
      meta,
      children: [
        {path: 'read/:id', ...messageRoute, component: Message, meta},
        {path: 'new', ...newMessageRoute, component: NewMessage, meta}
      ]
    }
  ]
}
