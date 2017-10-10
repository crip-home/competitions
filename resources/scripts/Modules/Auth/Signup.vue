<template>
  <form-panel
      id="signup"
      @submit="signup"
      :title="$t('auth.signup.title')"
      :body-col-md="10"
      :col-md="10"
      :col-lg="8"
  >
    <!-- #name -->
    <form-group
        for="name"
        :errors="errors.name"
        :label="$t('auth.signup.name.label')"
        :col-sm="8"
    >
      <input
          type="text"
          id="name"
          name="name"
          class="form-control"
          :placeholder="$t('auth.signup.name.placeholder')"
          v-model="form.name"
          v-focus="true"
          required
      >
    </form-group>

    <!-- #email -->
    <form-group
        for="email"
        :errors="errors.email"
        :label="$t('auth.signup.email.label')"
        :col-sm="8"
    >
      <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          :placeholder="$t('auth.signup.email.placeholder')"
          v-model="form.email"
          required
      >
    </form-group>

    <!-- #password -->
    <form-group
        for="password"
        :errors="errors.password"
        :label="$t('auth.signup.password.label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password"
          name="password"
          class="form-control"
          :placeholder="$t('auth.signup.password.placeholder')"
          v-model="form.password"
          required
      >
    </form-group>

    <!-- #password_confirmation -->
    <form-group
        for="password_confirmation"
        :label="$t('auth.signup.password_confirmation.label')"
        :col-sm="8"
    >
      <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          class="form-control"
          :placeholder="$t('auth.signup.password_confirmation.placeholder')"
          v-model="form.password_confirmation"
          required
      >
    </form-group>

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
  import FormPanel from '@/Components/Forms/FormPanel.vue'
  import FormGroup from '@/Components/Forms/FormGroup.vue'
  import Focus from '@/Components/Focus'
  import {AuthService} from './AuthService'

  type Dictionary = { [key: string]: string }

  @Component({
    name: 'Signup',
    components: {FormPanel, FormGroup},
    directives: {Focus},
  })
  export default class Signup extends Vue {
    mounted() {
      this.$logger.component(this)
    }

    public form = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }

    public errors = {}

    public signup() {
      this.$logger.info('signup', this)
    }
  }
</script>
