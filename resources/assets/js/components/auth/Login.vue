<template>

  <div id="login-view" class="col-md-8 col-md-offset-2">
    <div class="panel panel-default">
      <div class="panel-heading">Login</div>
      <form class="panel-body form-horizontal" @submit.prevent="login">

        <div class="form-group" :class="{'has-error': !!error}">
          <label for="email" class="col-md-4 control-label">E-Mail Address</label>
          <div class="col-md-6">
            <input id="email"
                   type="email"
                   class="form-control"
                   name="email"
                   v-model="credentials.email"
                   placeholder="Enter Your E-Mail Address"
                   required autofocus>

            <span class="help-block" v-if="!!error">
              <strong>{{ error }}</strong>
            </span>
          </div>
        </div>

        <div class="form-group" :class="{'has-error': !!error}">
          <label for="password" class="col-md-4 control-label">Password</label>
          <div class="col-md-6">
            <input id="password"
                   type="password"
                   class="form-control"
                   name="password"
                   v-model="credentials.password"
                   placeholder="Enter Your Password"
                   required>

          </div>
        </div>

        <div class="form-group">
          <div class="col-md-8 col-md-offset-4">
            <button type="submit" class="btn btn-primary">Login</button>
            <router-link class="btn btn-link" :to="password_reset">Forgot Your Password?</router-link>
          </div>
        </div>

      </form>
    </div>

  </div>

</template>

<script>
    import auth from './../../api/auth'
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
                },
                password_reset: routes.email_password,
                error: ''
            }
        },

        methods: {

            login() {
                let credentials = Object.assign({}, this.credentials);
                auth.login(credentials)
                    .then(() => {
                        this.$router.push(routes.home)
                    }, error => {
                        this.error = error;
                    });
            }

        }

    }
</script>