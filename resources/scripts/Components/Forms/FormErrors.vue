<template>
  <ul class="help-block crip-form-errors" v-if="hasErrors">
    <li v-for="error in errors" class="text-danger">{{ error }}</li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({name: 'component-form-errors'})
  export default class FormErrors extends Vue {
    @Prop({'type': Array, 'default': () => []})
    errors: string[]

    get hasErrors() {
      return this.errors.length > 0
    }
  }
</script>