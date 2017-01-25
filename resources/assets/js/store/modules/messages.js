import { MESSAGES_CHECK, MESSAGES_UPD } from '../types'

import messages from './../../api/users/messages'

const state = {
  unread: 0
}

const actions = {
  [MESSAGES_CHECK] ({commit}) {
    messages.countUnread()
      .then(count => {
        commit(MESSAGES_UPD, count)
      })
  }
}

const mutations = {
  [MESSAGES_UPD] (state, count) {
    state.unread = count
  }
}

export default {state, mutations, actions}
