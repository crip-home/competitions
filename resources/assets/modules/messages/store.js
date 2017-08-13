import messages from './api'

const state = {
  unread: 0
}

const actions = {
  /**
   * Check actual message count on server side and update value in store.
   * @param commit
   */
  checkMessageCount ({commit}) {
    messages.countUnread()
      .then(count => {
        commit('messagesCountUpdated', count)
      })
  }
}

const mutations = {
  /**
   * Update message count in store instance.
   * @param state
   * @param count
   */
  messagesCountUpdated (state, count) {
    state.unread = count
  }
}

export default {state, mutations, actions}
