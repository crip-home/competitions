import {
  messagesRoute, messageRoute, newMessageRoute, profileRoute
} from '../routes'

import ChildHolder from '../../components/ChildHolder.vue'
import Messages from '../../components/user/messages/Messages.vue'
import Message from '../../components/user/messages/MessageModal.vue'
import NewMessage from '../../components/user/messages/NewMessageModal.vue'
import Profile from '../../components/user/Profile.vue'

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
    },
    {path: 'profile/:id?', ...profileRoute, component: Profile}
  ]
}
