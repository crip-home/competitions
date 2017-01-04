<template>
  <panel :submit="login" title="Login"
         class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">

    <form-group id="email" label="E-Mail Address" :errors="error" :col-lg="6" :col-md="6" :col-sm="8">
      <input id="email" type="email" class="form-control" name="email" v-model="credentials.email"
             placeholder="Enter Your E-Mail Address" required v-focus="true">
    </form-group>

    <form-group id="password" label="Password" :errors="null" :col-lg="6" :col-md="6" :col-sm="8">
      <input id="password" type="password" class="form-control" name="password" v-model="credentials.password"
             placeholder="Enter Your Password" required>
    </form-group>

    <submit :col-lg="6" :col-md="6" :col-sm="8">
      <button type="submit" class="btn btn-primary">Login</button>
      <router-link class="btn btn-link" :to="password_reset">Forgot Your Password?</router-link>
    </submit>

  </panel>
</template>

<script>
    import auth from './../../api/auth'
    import * as routes from './../../router/routes'
    import Panel from './../helpers/forms/Panel.vue'
    import FormGroup from './../helpers/forms/FormGroup.vue'
    import SubmitArea from './../helpers/forms/SubmitArea.vue'

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
                },
                password_reset: routes.email_password,
                error: null
            }
        },

        methods: {

            login() {
                this.error = null;

                let credentials = Object.assign({}, this.credentials);
                auth.login(credentials)
                    .then(() => {
                        this.redirectAuthenticated();
                    }, error => {
                        this.error = [error];
                    });
            },

            redirectAuthenticated() {
                if (this.$route.query && this.$route.query.redirect) {
                    // if user has redirected here by guard, redirect him back
                    // to guarded route instead of home
                    this.$router.push(this.$route.query.redirect);
                }
                else
                    this.$router.push(routes.home);
            },

        },

        watch: {

            '$store.state.auth.user.details'(newVal) {
                // Watching user details, because they arrives later than route
                // guard redirects to login and in case we receive them, we can
                // redirect him to requested route
                if (newVal === true) {
                    this.redirectAuthenticated();
                }
            },

        },

        components: {
            panel: Panel,
            formGroup: FormGroup,
            submit: SubmitArea
        }

    }
</script>