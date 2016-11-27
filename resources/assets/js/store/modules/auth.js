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

    [mTypes.AUTH_LOGIN] (state) {
        state.user.authenticated = true;

        Vue.http.interceptors.push((request, next) => {
            request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

            next();
        });
    },

    [mTypes.AUTH_LOGOUT] (state) {
        localStorage.removeItem('token');
        state.user.authenticated = false
    },

    [mTypes.AUTH_ERROR](state, error) {
        state.error = error
    },

    [mTypes.AUTH_DATA_UPD](state, payload) {
        state.user.name = payload.name;
        state.user.email = payload.email;
    },

};

const actions = {

    [aTypes.AUTH_USER] ({commit, dispatch}, {credentials, route}) {
        Vue.http.post(settings.apiUrl('authenticate'), credentials)
            .then(({data}) => {
                localStorage.setItem('token', data.token);
                commit(mTypes.AUTH_LOGIN);
                dispatch(aTypes.AUTH_GET_USER);

                if (route)
                    router.push(route)

            }, ({data}) => {
                commit(mTypes.AUTH_ERROR, data.error)
            })
    },

    [aTypes.AUTH_CHECK] ({commit, dispatch}) {
        if (localStorage.getItem('token')) {
            commit(mTypes.AUTH_LOGIN);
            dispatch(aTypes.AUTH_GET_USER);
        }
    },

    [aTypes.AUTH_GET_USER] ({commit, state}) {
        if (state.user.authenticated && localStorage.getItem('token')) {
            Vue.http.get(settings.apiUrl('authenticate'))
                .then(({data}) => {
                    commit(mTypes.AUTH_DATA_UPD, data);
                }, r => settings.handleError(r))
        }
    },

};

export default {state, mutations, actions};