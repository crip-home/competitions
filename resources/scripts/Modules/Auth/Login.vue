<template>
  <form-panel
      :title="$t('auth.login.title')" :submit="authorize"
      class="col-sm-10 col-sm-offset-1
             col-md-8 col-md-offset-2
             col-lg-6 col-lg-offset-3">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-md-offset-1">

        <form-group
            for="email" :label="$t('auth.login.email.label')"
            :errors="error" :col-sm="8">
          <input
              id="email" type="email"
              class="form-control" name="email"
              v-model="credentials.email" required
              :placeholder="$t('auth.login.email.placeholder')"
              v-focus="true">
        </form-group>

        <form-group
            for="password" :col-sm="8"
            :label="$t('auth.login.password.label')">
          <input
              id="password" type="password"
              class="form-control" name="password"
              v-model="credentials.password" required
              :placeholder="$t('auth.login.password.placeholder')"
              v-focus="true">
        </form-group>

        <form-group for="submit">
          <button type="submit" class="btn btn-primary">
            {{ $t('auth.login.submit.button') }}
          </button>
          <router-link class="btn btn-link" :to="passwordReset">
            {{ $t('auth.login.submit.forgot') }}
          </router-link>
        </form-group>
      </div>
    </div>
  </form-panel>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import FormPanel from '@/Components/Forms/FormPanel.vue'
  import FormGroup from '@/Components/Forms/FormGroup.vue'
  import Focus from '@/Components/Focus'
  import {passwordReset, home, Route} from '@/Router/Routes'
  import {AuthService} from './AuthService'

  @Component({
    name: 'module-auth-login',
    components: {FormPanel, FormGroup},
    directives: {Focus},
  })
  export default class Login extends Vue {
    mounted() {
      this.$logger.component(this)
    }

    public credentials = {
      email: '',
      password: '',
    }

    public error: string[] = []

    public get passwordReset(): Route {
      return passwordReset
    }

    public async authorize() {
      this.$logger.info('authorize', this.credentials)
      this.error = []
      try {
        await AuthService.authorize(this.credentials)

        // If user has redirected here by guard, redirect him back
        // to guarded route instead of home page.
        if(this.$route.query && this.$route.query['redirect']) {
          this.$router.push(this.$route.query['redirect'])
          return
        }

        this.$router.push(home)
      } catch (error) {
        this.error = [error]
      }
    }
  }
</script>
