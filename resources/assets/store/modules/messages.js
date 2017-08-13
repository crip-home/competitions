import { checkMessageCount, messagesCountUpdated } from '../types'

import messages from '../../modules/messages/api'

const state = {
  unread: 0
}

const actions = {
  [checkMessageCount] ({commit}) {
    messages.countUnread()
      .then(count => {
        commit(messagesCountUpdated, count)
      })
  }
}

const mutations = {
  [messagesCountUpdated] (state, count) {
    state.unread = count
  }
}

export default {state, mutations, actions}
