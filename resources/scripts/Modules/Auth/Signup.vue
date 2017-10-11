<template>
  <form-panel
      id="signup"
      @submit="signup"
      :form="form"
      :title="$t('auth.signup.title')"
      :body-col-md="10"
      :col-md="10"
      :col-lg="8"
  >
    <!-- #name -->
    <form-group
        for="name"
        :form="form"
        :label="$t('auth.signup.name.label')"
        :col-sm="8"
    >
      <input
          type="text"
          id="name"
          name="name"
          class="form-control"
          :placeholder="$t('auth.signup.name.placeholder')"
          v-model="form.data.name"
          v-focus="true"
          required
      >
    </form-group>

    <!-- #email -->
    <form-group
        for="email"
        :form="form"
        :label="$t('auth.signup.email.label')"
        :col-sm="8"
    >
      <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          :placeholder="$t('auth.signup.email.placeholder')"
          v-model="form.data.email"
          required
      >
    </form-group>

    <!-- #password -->
    <form-group
        for="password"
        :form="form"
        :label="$t('auth.signup.password.label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          :placeholder="$t('auth.signup.password.placeholder')"
          v-model="form.data.password"
          required
      >
    </form-group>

    <!-- #password_confirmation -->
    <form-group
        for="password_confirmation"
        :form="form"
        :label="$t('auth.signup.password_confirmation.label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          class="form-control"
          :placeholder="$t('auth.signup.password_confirmation.placeholder')"
          v-model="form.data.password_confirmation"
          required
      >
    </form-group>

    <!-- #submit -->
    <form-group for="submit" :col-sm="8">
      <button id="submit" type="submit" class="btn btn-primary">
        {{ $t('auth.signup.submit.button') }}
      </button>
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
  import {login} from '@/Router/Routes'
  import {AuthService} from './AuthService'

  @Component({
    name: 'Signup',
    components: {FormPanel, FormGroup},
    directives: {Focus},
  })
  export default class Signup extends Vue {
    mounted() {
      this.$logger.component(this)
    }

    public form = new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

    public async signup() {
      this.form.clearErrors()
      this.$logger.info('signup', this)
      try {
        await AuthService.signUp(this.form.data)
        this.$router.push(login)
      } catch (errors) {
        this.form.addErrors(errors)
      }
    }
  }
</script>
