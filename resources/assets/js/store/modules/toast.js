import { TOAST_ADD, TOAST_REMOVE } from '../types'

const state = {
  toasts: []
}

const mutations = {
  [TOAST_ADD] (state, payload) {
    if (!payload.class) { payload.class = ['toast-success'] }

    state.toasts.push(payload)
  },

  [TOAST_REMOVE] (state, {index}) {
    state.toasts.splice(index, 1)
  }
}

export default {state, mutations}
