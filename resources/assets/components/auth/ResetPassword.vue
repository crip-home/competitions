<template>
  <form-panel :submit="reset" title="Reset Password" class="col-md-8 col-md-offset-2">

    <form-group id="email" label="E-Mail Address" :errors="error" :col-lg="6" :col-md="8">
      <input id="email" type="email" class="form-control" name="email" required v-model="form.email"
             placeholder="Enter Your E-Mail Address" v-focus="true">
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
      <button type="submit" class="btn btn-primary">Reset</button>
    </submit>
  </form-panel>
</template>

<script>
  import Vue from 'vue'
  import auth from '../../api/auth'
  import * as routes from '../../router/routes'
  import * as types from '../../store/types'

  export default {
    mounted () {
      this.form.token = this.$route.params.token
    },

    data () {
      return {
        errors: {},
        form: {
          email: '',
          password: '',
          password_confirmation: '',
          token: ''
        }
      }
    },

    methods: {
      reset () {
        auth.reset(this.form)
          .then(status => {
            this.$store.commit(types.addToast, {message: status})
            this.$router.push(routes.login)
          }, errors => {
            Vue.set(this, 'errors', errors)
          })
      }
    }
  }
</script>