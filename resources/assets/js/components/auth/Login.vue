<template>
  <div id="login-view" class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input type="text"
             name="email"
             class="form-control"
             placeholder="Enter your username"
             v-model="credentials.email">
    </div>
    <div class="form-group">
      <input type="password"
             name="password"
             class="form-control"
             placeholder="Enter your password"
             v-model="credentials.password">
    </div>
    <button class="btn btn-primary" @click="login()">Access</button>
  </div>
</template>

<script>
    import * as aTypes from './../../store/actions'
    import * as routes from './../../router/routes'

    export default {

        mounted() {
            if (this.$store.state.auth.user.authenticated)
                this.$router.push(routes.home)
        },

        data() {
            return {
                credentials: {
                    email: '',
                    password: ''
                }
            }
        },

        computed: {
            error() {
                return this.$store.state.auth.error;
            }
        },

        methods: {

            login() {
                let credentials = Object.assign({}, this.credentials);
                this.$store.dispatch(aTypes.USER_AUTHORISE, {credentials, route: routes.home});
            }

        }

    }
</script>