<template>

  <panel :submit="register" title="Register" id="signup" class="col-md-8 col-md-offset-2">

    <form-group id="name" label="Name" :errors="errors.name" :size="6">
      <input id="name" type="text" class="form-control" name="name" required autofocus v-model="form.name">
    </form-group>

    <form-group id="email" label="E-Mail Address" :errors="errors.email" :size="6">
      <input id="email" type="email" class="form-control" name="email" required v-model="form.email">
    </form-group>

    <form-group id="password" label="Password" :errors="errors.password" :size="6">
      <input id="password" type="password" class="form-control" name="password" required v-model="form.password">
    </form-group>

    <form-group id="password_confirmation" label="Confirm Password" :size="6">
      <input id="password_confirmation" type="password" class="form-control" name="password_confirmation" required
             v-model="form.password_confirmation">
    </form-group>

    <submit :size="6">
      <button type="submit" class="btn btn-primary">Register</button>
    </submit>

  </panel>
</template>

<script>
    import Vue from 'vue'
    import * as routes from './../../router/routes'
    import auth from './../../api/auth'

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
                errors: {},
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
            }
        },

        methods: {

            register() {
                auth.register(this.form)
                    .then(
                        _ => this.$router.push(routes.login),
                        errors => Vue.set(this, 'errors', errors)
                    );
            },

        },

        components: {
            panel: Panel,
            formGroup: FormGroup,
            submit: SubmitArea
        }

    }
</script>