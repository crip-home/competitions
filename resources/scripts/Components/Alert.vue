<template>
  <div v-if="isVisible">
    <div
        class="alert alert-dismissible"
        :class="[`alert-${type}`]"
    >
      <button
          type="button"
          class="close"
          @click="hide"
      >
        &times;
      </button>

      <slot/>

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  const typeValues = ['success', 'info', 'warning', 'danger']

  @Component({name: 'Alert'})
  export default class Alert extends Vue {
    mounted() {
      this.$logger.component(this)
    }

    @Prop({
      'type': String,
      'default': () => 'danger',
      'validator': (value) => typeValues.indexOf(value) > -1
    })
    public type: 'success' | 'info' | 'warning' | 'danger'

    @Prop({'type': Boolean, 'default': () => true})
    public isVisible: boolean

    public hide() {
      this.$emit('update:isVisible', false)
      this.$emit('hide')
    }
  }
</script>
