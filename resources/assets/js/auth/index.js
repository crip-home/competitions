import router from './../router'

export default {

    user: {
        authenticated: false
    },

    login(ctx, credentials, redirect) {
        ctx.$http.post('/session/create/', credentials)
            .then(data => {
                localStorage.setItem('id_token', data.id_token);
                this.user.authenticated = true;

                if (redirect) {
                    router.push({name: redirect});
                }
            })
            .catch(err => {
                ctx.error = err;
            })
    },

    signup(ctx, credentials, redirect) {
        ctx.$http.post(SIGNUP_URL, credentials)
            .then(data => {
                localStorage.setItem('id_token', data.id_token);
                this.user.authenticated = true;

                if (redirect) {
                    router.push({name: redirect});
                }
            })
            .catch(err => {
                ctx.error = err
            })
    },

    // To log out, we just need to remove the token
    logout() {
        localStorage.removeItem('id_token');
        this.user.authenticated = false
    },

    checkAuth() {
        let jwt = localStorage.getItem('id_token');
        this.user.authenticated = !!jwt;
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
    }

}