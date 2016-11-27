<template>
  <div id="reset-password" class="col-md-8 col-md-offset-2">
    <div class="panel panel-default">
      <div class="panel-heading">Reset Password</div>

      <form class="panel-body form-horizontal" @submit.prevent="reset">

        <div class="form-group" :class="{'has-error': errors.email}">
          <label for="email" class="col-md-4 control-label">E-Mail Address</label>

          <div class="col-md-6">
            <input id="email"
                   type="email"
                   class="form-control"
                   name="name"
                   v-model="details.email"
                   required>

            <ul class="help-block" v-if="errors.email">
              <li>{{ errors.email }}</li>
            </ul>
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

            <ul class="help-block" v-if="errors.password">
              <li v-for="error in errors.password">{{ error }}</li>
            </ul>
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
            <button type="submit" class="btn btn-primary">Reset Password</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import auth from './../../api/auth'
    import * as types from './../../store/mutations'
    import * as routes from './../../router/routes'

    export default {

        mounted() {
            this.details.token = this.$route.params.token;
        },

        data() {
            return {
                errors: {email: false, password: false},
                details: {
                    email: '',
                    password: '',
                    password_confirmation: '',
                    token: ''
                },
            }
        },

        methods: {

            reset() {
                auth.reset(this.details)
                    .then(status => {
                        this.$store.commit(types.TOAST_ADD, {message: status});
                        this.$router.push(routes.login);
                    }, errors => {
                        Vue.set(this, 'errors', errors);
                    });
            },

        },

    }
</script>