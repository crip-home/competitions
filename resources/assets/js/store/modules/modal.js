import { MODAL_CLOSE, MODAL_OPENED } from '../types'

const state = {
  modals: []
}

const mutations = {
  [MODAL_OPENED] (state, payload) {
    state.modals.push(payload)
  },

  [MODAL_CLOSE] (state, payload) {
    state.modals.splice(state.modals.indexOf(payload), 1)
  }
}

export default {state, mutations}
