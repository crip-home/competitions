<template>
  <panel :submit="login" title="Login" class="col-md-8 col-md-offset-2">

    <form-group id="email" label="E-Mail Address" :errors="error" size-change="md" :size="6">
      <input id="email" type="email" class="form-control" name="email" v-model="credentials.email"
             placeholder="Enter Your E-Mail Address" required autofocus>
    </form-group>

    <form-group id="password" label="Password" :errors="null" size-change="md" :size="6">
      <input id="password" type="password" class="form-control" name="password" v-model="credentials.password"
             placeholder="Enter Your Password" required>
    </form-group>

    <submit size-change="md" :size="6">
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
                        this.$router.push(routes.home)
                    }, error => {
                        this.error = [error];
                    });
            },

        },

        components: {
            panel: Panel,
            formGroup: FormGroup,
            submit: SubmitArea
        }

    }
</script>