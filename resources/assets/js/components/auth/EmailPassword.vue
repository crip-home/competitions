<template>
  <div id="email-password" class="col-md-8 col-md-offset-2">
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
                   v-model="email"
                   required>

            <ul class="help-block" v-if="errors.email">
              <li v-for="error in errors.email">{{ error }}</li>
            </ul>
          </div>
        </div>

        <div class="form-group">
          <div class="col-md-6 col-md-offset-4">
            <button type="submit" class="btn btn-primary">Send Password Reset Link</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import auth from './../../api/auth'
    import * as routes from './../../router/routes'
    import * as types from '../../store/types'

    export default {

        data() {
            return {
                email: '',
                errors: {email: false}
            }
        },

        methods: {

            reset() {
                auth.sendResetLink(this.email)
                    .then(status => {
                            this.$store.commit(types.TOAST_ADD, {message: status});
                            this.$router.push(routes.home);
                        },
                        errors => Vue.set(this, 'errors', errors)
                    );
            },

        },
    }
</script>