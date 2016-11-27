import * as mTypes from './../mutations'

const state = {

    toasts: [],

};

const mutations = {

    [mTypes.TOAST_ADD] (state, payload) {
        if (!payload.class)
            payload.class = ['toast-success'];

        state.toasts.push(payload);
    },

    [mTypes.TOAST_REMOVE] (state, {index}) {
        state.toasts.splice(index, 1);
    },

};

export default {state, mutations};