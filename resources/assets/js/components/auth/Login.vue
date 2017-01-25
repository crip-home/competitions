<template>
  <form-panel :submit="login" title="Login"
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

  </form-panel>
</template>

<script>
  import auth        from './../../api/auth'
  import * as routes from './../../router/routes'

  export default {
    mounted () {
      if (this.$store.state.auth.user.authenticated) {
        this.redirectAuthenticated()
      }
    },

    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        password_reset: routes.emailPassword,
        error: null
      }
    },

    methods: {
      login () {
        this.error = null

        let credentials = Object.assign({}, this.credentials)
        // Authorization will be handled by watch, so here is
        // no need to listen success response.
        // Watch will be triggered by vuex store events from
        // auth.login method itself
        auth.login(credentials)
          .catch(error => { this.error = [error] })
      },

      redirectAuthenticated () {
        if (this.$route.query && this.$route.query.redirect) {
          // if user has redirected here by guard, redirect him back
          // to guarded route instead of home
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push(routes.home)
        }
      }
    },

    watch: {
      '$store.state.auth.user.authenticated' (newVal) {
        // Watching user details, because they arrives later than route
        // guard redirects to login and in case we receive them, we can
        // redirect him to requested route
        if (newVal === true) {
          this.redirectAuthenticated()
        }
      }
    }
  }
</script>