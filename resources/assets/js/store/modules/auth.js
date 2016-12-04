import Vue from 'vue'
import * as mTypes from './../mutations'

const state = {

    user: {
        authenticated: false,
        name: '',
        email: ''
    },

    roles: []

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

    [mTypes.AUTH_DATA_UPD](state, payload) {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.roles = [];
        payload.roles.forEach((role) => state.roles.push(role.key));
    },

};

export default {state, mutations};