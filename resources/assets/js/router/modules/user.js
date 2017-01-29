import {
  messagesRoute, messageRoute, newMessageRoute
} from '../routes'

import ChildHolder from '../../components/ChildHolder.vue'
import Messages from '../../components/user/messages/Messages.vue'
import Message from '../../components/user/messages/MessageModal.vue'
import NewMessage from '../../components/user/messages/NewMessageModal.vue'

const meta = {requiresAuth: true}
export default {
  path: '/user',
  component: ChildHolder,
  children: [
    {
      path: 'messages/:type/:page?',
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
