<template>
  <form-panel
      :submit="reset" title="Reset Password" id="email-password"
      class="col-md-8 col-md-offset-2"
  >

    <form-group
        id="email" label="E-Mail Address" :errors="errors.email" :col-lg="6"
        :col-md="8"
    >
      <input
          id="email" type="email" class="form-control" title="E-Mail Address"
          name="email" required v-focus="true" v-model="form.email"
      >
    </form-group>

    <submit :col-lg="6" :col-md="8">
      <button type="submit" class="btn btn-primary">
        Send Password Reset Link
      </button>
    </submit>

  </form-panel>
</template>

<script>
  import Vue from 'vue'
  import auth from './api'
  import { home } from '../../router/routes'

  export default {
    data () {
      return {
        form: {
          email: ''
        },
        errors: {}
      }
    },

    methods: {
      reset () {
        auth.sendResetLink(this.form.email)
          .then(
            status => {
              this.$toasted.success(status)
              this.$router.push(home)
            },
            errors => { Vue.set(this, 'errors', errors) }
          )
      }
    }
  }
</script>