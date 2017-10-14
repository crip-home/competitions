<template>
  <form-panel
      id="login"
      @submit="authorize"
      :form="form"
      :title="$t('auth.login.title')"
      :body-col-md="10"
      :col-sm="10"
      :col-md="8"
      :col-lg="6"
  >

    <!-- #email -->
    <form-group
        for="email"
        :form="form"
        :label="$t('auth.login.email.label')"
        :col-sm="8"
    >
      <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          :placeholder="$t('auth.login.email.placeholder')"
          v-model="form.data.email"
          v-focus="true"
          required
      >
    </form-group>

    <!-- #password -->
    <form-group
        for="password"
        :label="$t('auth.login.password.label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          :placeholder="$t('auth.login.password.placeholder')"
          v-model="form.data.password"
          required
      >
    </form-group>

    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <button id="submit" type="submit" class="btn btn-primary">
        {{ $t('auth.login.submit.button') }}
      </button>

      <router-link :to="passwordReset" class="btn btn-link">
        {{ $t('auth.login.submit.forgot') }}
      </router-link>
    </form-group>
  </form-panel>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Form from '@/Components/Forms/Form'
  import FormPanel from '@/Components/Forms/FormPanel.vue'
  import FormGroup from '@/Components/Forms/FormGroup.vue'
  import Focus from '@/Components/Focus'
  import {passwordReset, home, Route} from '@/Router/Routes'
  import {AuthService} from './AuthService'

  @Component({
    name: 'Login',
    components: {FormPanel, FormGroup},
    directives: {Focus},
  })
  export default class Login extends Vue {
    mounted() {
      this.$logger.component(this)

      if (AuthService.isAuthenticated()) {
        this.$router.push(home)
      }
    }

    public form = new Form({
      email: '',
      password: '',
    })

    public get passwordReset(): Route {
      return passwordReset
    }

    public async authorize() {
      this.$logger.info('authorize', this.form)
      this.form.clearErrors()
      try {
        await AuthService.authorize(this.form.data)
      } catch (error) {
        this.form.addErrors({email: [error]})
      }
    }
  }
</script>
