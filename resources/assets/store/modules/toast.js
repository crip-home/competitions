import { addToast, removeToast } from '../types'

const state = {
  toasts: []
}

const mutations = {
  [addToast] (state, payload) {
    if (!payload.class) { payload.class = ['toast-success'] }

    state.toasts.push(payload)
  },

  [removeToast] (state, {index}) {
    state.toasts.splice(index, 1)
  }
}

export default {state, mutations}
