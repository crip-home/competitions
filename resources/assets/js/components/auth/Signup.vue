<template>
  <div id="signup-view">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-heading">Register</div>
        <form class="panel-body form-horizontal" @submit.prevent="register">

          <div class="form-group" :class="{'has-error': errors.name}">
            <label for="name" class="col-md-4 control-label">Name</label>

            <div class="col-md-6">
              <input id="name"
                     type="text"
                     class="form-control"
                     name="name"
                     v-model="details.name"
                     required autofocus>

              <span class="help-block" v-if="errors.name">
                  <strong>{{ errors.name }}</strong>
              </span>
            </div>
          </div>

          <div class="form-group" :class="{'has-error': errors.email}">
            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

            <div class="col-md-6">
              <input id="email"
                     type="email"
                     class="form-control"
                     name="name"
                     v-model="details.email"
                     required>

              <span class="help-block" v-if="errors.email">
                  <strong>{{ errors.email }}</strong>
              </span>
            </div>
          </div>

          <div class="form-group" :class="{'has-error': errors.password}">
            <label for="password" class="col-md-4 control-label">Password</label>

            <div class="col-md-6">
              <input id="password"
                     type="password"
                     class="form-control"
                     name="password"
                     v-model="details.password"
                     required>

              <span class="help-block" v-if="errors.password">
                  <strong>{{ errors.password }}</strong>
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

            <div class="col-md-6">
              <input id="password-confirm"
                     type="password"
                     class="form-control"
                     name="password_confirmation"
                     v-model="details.password_confirmation"
                     required>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
              <button type="submit" class="btn btn-primary">Register</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import * as routes from './../../router/routes'

    export default {

        mounted() {
            if (this.$store.state.auth.user.authenticated)
                this.$router.push(routes.home)
        },

        data() {
            return {
                errors: {name: '', email: '', password: ''},
                details: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
            }
        },

        methods: {

            register() {
              console.log(this.details)
            },

        },

    }
</script>