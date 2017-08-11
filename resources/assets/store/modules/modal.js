import { closeModal, modalOpened } from '../types'

const state = {
  modals: []
}

const mutations = {
  [modalOpened] (state, payload) {
    state.modals.push(payload)
  },

  [closeModal] (state, payload) {
    state.modals.splice(state.modals.indexOf(payload), 1)
  }
}

export default {state, mutations}
