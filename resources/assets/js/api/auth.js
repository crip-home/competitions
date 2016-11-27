import {http} from 'vue'
import store from './../store'
import * as mTypes from './../store/mutations'
import settings from './../store/settings'

export default {

    login(credentials) {
        return new Promise((resolve, reject) => {

            http.post(settings.apiUrl('authenticate'), credentials)
                .then(({data}) => {
                    localStorage.setItem('token', data.token);
                    store.commit(mTypes.AUTH_LOGIN);
                    this.getAuthUserDetails(resolve);
                }, ({data}) => {
                    reject(data.error)
                });

        });
    },

    checkAuth() {
        if (localStorage.getItem('token')) {
            store.commit(mTypes.AUTH_LOGIN);
            this.getAuthUserDetails(window.noop);
        }
    },

    getAuthUserDetails(onResolved) {
        http.get(settings.apiUrl('authenticate'))
            .then(({data}) => {
                store.commit(mTypes.AUTH_DATA_UPD, data);
                onResolved(data);
            }, r => settings.handleError(r))
    },

    register(details) {
        return new Promise((resolve, reject) => {
            http.post(settings.apiUrl('register'), details)
                .then(({data}) => {
                    localStorage.setItem('token', data.token);
                    store.commit(mTypes.AUTH_LOGIN);
                    store.commit(mTypes.AUTH_DATA_UPD, data);
                    resolve(data);
                }, ({data}) => {
                    reject(data);
                });
        });
    },

    sendResetLink(email) {
        return new Promise((resolve, reject) => {
            http.post(settings.apiUrl('password/email'), {email})
                .then(({data}) => {
                    resolve(data.status);
                }, ({data}) => {
                    reject(data);
                });
        });
    },

    reset(details) {
        return new Promise((resolve, reject) => {
            http.post(settings.apiUrl('password/reset'), details)
                .then(({data}) => {
                    resolve(data.status);
                }, ({data}) => {
                    reject(data);
                });
        });
    },
}