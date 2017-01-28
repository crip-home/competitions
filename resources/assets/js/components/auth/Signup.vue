<template>
  <form-panel :submit="register" title="Register" id="signup" class="col-md-8 col-md-offset-2">

    <form-group id="name" label="Name" :errors="errors.name" :col-lg="6" :col-md="8">
      <input id="name" type="text" class="form-control" name="name" required title="Name"
             v-focus="true" v-model="form.name">
    </form-group>

    <form-group id="email" label="E-Mail Address" :errors="errors.email" :col-lg="6" :col-md="8">
      <input id="email" type="email" class="form-control" name="email" required title="E-Mail Address"
             v-model="form.email">
    </form-group>

    <form-group id="password" label="Password" :errors="errors.password" :col-lg="6" :col-md="8">
      <input id="password" type="password" class="form-control" name="password" required title="Password"
             v-model="form.password">
    </form-group>

    <form-group id="password_confirmation" label="Confirm Password" :col-lg="6" :col-md="8">
      <input id="password_confirmation" type="password" class="form-control" name="password_confirmation" required
             title="Confirm Password" v-model="form.password_confirmation">
    </form-group>

    <submit :col-lg="6" :col-md="8">
      <button type="submit" class="btn btn-primary">Register</button>
    </submit>

  </form-panel>
</template>

<script>
  import Vue from 'vue'
  import * as routes from '../../router/routes'
  import auth from '../../api/auth'

  export default {
    mounted () {
      if (this.$store.state.auth.user.authenticated) {
        this.$router.push(routes.home)
      }
    },

    data () {
      return {
        errors: {},
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
    },

    methods: {
      register () {
        auth.register(this.form)
          .then(
            _ => { this.$router.push(routes.login) },
            errors => { Vue.set(this, 'errors', errors) }
          )
      }
    }
  }
</script>