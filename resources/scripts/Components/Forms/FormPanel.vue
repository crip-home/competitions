<template>
  <form @submit.prevent="submit" class="crip-form-panel crip-panel">
    <div class="panel panel-default">

      <div class="panel-heading clearfix">
        <div class="v-panel-title pull-left">{{ title }}</div>
        <div class="v-panel-title pull-right">
          <slot name="actions"/>
        </div>
      </div>

      <div class="panel-body form-horizontal">
        <slot/>
      </div>

    </div>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({name: 'FormPanel'})
  export default class FormPanel extends Vue {
    @Prop({'type': String, 'required': true})
    public title: string

    @Prop({'type': Function, 'required': true})
    public submit: () => void
  }
</script>