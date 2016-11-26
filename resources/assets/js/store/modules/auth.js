import Vue from 'vue'
import router from './../../router'
import settings from './../settings'
import * as mTypes from './../mutations'
import * as aTypes from './../actions'

const state = {

    user: {
        authenticated: false,
        name: '',
        email: ''
    },

    error: '',

};

const mutations = {

    [mTypes.USER_AUTHORISED] (state) {
        state.user.authenticated = true;
        Vue.http.headers.common['Authorization'] = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    },

    [mTypes.USER_UNAUTHORISED] (state) {
        localStorage.removeItem('token');
        state.user.authenticated = false
    },

    [mTypes.USER_AUTHORISE_ERROR](state, error) {
        state.error = error
    },

    [mTypes.USER_DETAILS_UPDATED](state, payload) {
        state.user.name = payload.name;
        state.user.email = payload.email;
    },

};

const actions = {

    [aTypes.USER_AUTHORISE] ({commit}, {credentials, route}) {
        Vue.http.post(settings.apiUrl('authenticate'), credentials)
            .then(({data}) => {
                localStorage.setItem('token', data.token);
                commit(mTypes.USER_AUTHORISED);

                if (route)
                    router.push(route)

            }, ({data}) => {
                commit(mTypes.USER_AUTHORISE_ERROR, data.error)
            })
    },

    [aTypes.USER_AUTHORISE_CHECK] ({commit}) {
        console.log(aTypes.USER_AUTHORISE_CHECK, !!localStorage.getItem('token'));
        if (localStorage.getItem('token'))
            commit(mTypes.USER_AUTHORISED)
    },

    [aTypes.USER_AUTHORISE_GET_DETAILS] ({commit, state}) {
        if (state.user.authenticated && localStorage.getItem('token')) {
            Vue.http.get(settings.apiUrl('authenticate'))
                .then(({data}) => {
                    commit(mTypes.USER_DETAILS_UPDATED, data);
                }, r => settings.handleError(r))
        }
    },

};

export default {state, mutations, actions};