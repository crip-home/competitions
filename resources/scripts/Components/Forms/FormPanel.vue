<template>
  <form
      @submit.prevent="submit"
      :class="elementClass"
      class="crip-form-panel crip-panel"
  >
    <div class="panel panel-default">

      <div class="panel-heading clearfix">
        <div class="v-panel-title pull-left">
          {{ title }}
        </div>
        <div class="v-panel-title pull-right">
          <slot name="actions"/>
        </div>
      </div>

      <div class="panel-body form-horizontal">
        <div class="row">
          <alert
              :is-visible.sync="showError"
              class="col-md-12"
          >
            {{ error }}
          </alert>

          <div :class="contentClass">
            <slot/>
          </div>
        </div>
      </div>

    </div>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop, Watch} from 'vue-property-decorator'
  import Alert from '@/Components/Alert.vue'
  import Utils from '@/Helpers/Utils'
  import Form from './Form'

  @Component({
    name: 'FormPanel',
    components: {Alert}
  })
  export default class FormPanel extends Vue {
    @Prop({'type': String, 'required': true})
    public title: string

    @Prop({'type': Form, 'default': () => new Form({__: false})})
    public form: Form<any>

    @Prop({'type': Number, 'default': () => 0})
    public bodyColLg: number

    @Prop({'type': Number, 'default': () => 0})
    public bodyColMd: number

    @Prop({'type': Number, 'default': () => 0})
    public bodyColSm: number

    @Prop({'type': Number, 'default': () => 12})
    public bodyColXs: number

    @Prop({'type': Number, 'default': () => 0})
    public colLg: number

    @Prop({'type': Number, 'default': () => 0})
    public colMd: number

    @Prop({'type': Number, 'default': () => 0})
    public colSm: number

    @Prop({'type': Number, 'default': () => 12})
    public colXs: number

    showError = false

    public get contentClass(): string[] {
      return this.calculateColClass('bodyCol{size}')
    }

    public get elementClass() {
      let classes = []

      if (this.hasErrors) {
        classes.push('has-data-errors')
      }

      if (this.hasError) {
        classes.push('has-global-error')
      }

      return this.calculateColClass('col{size}', classes)
    }

    public get hasErrors() {
      return this.form.hasErrors
    }

    public get hasError() {
      return this.form.hasUnknownError
    }

    public get error() {
      return this.form.unknownError
    }

    public submit() {
      this.$emit('submit')
    }

    private calculateColClass(selectorTemplate: string, initial: string[] = []) {
      ['Lg', 'Md', 'Sm', 'Xs'].forEach(size => {
        const valueKey = Utils.supplant(selectorTemplate, {size})
        const value = this[valueKey]

        // Skip zero values to avoid un-required classes
        if (value <= 0) return

        const offset = parseInt(((12 - value) / 2).toString())
        const sizeKey = size.toLowerCase()
        initial.push(`col-${sizeKey}-offset-${offset}`)
        initial.push(`col-${sizeKey}-${value}`)

      })

      return initial
    }

    @Watch('hasError')
    private onHasErrorChanged(value: boolean, oldValue: boolean) {
      if (!oldValue && value) {
        this.showError = true
      }

      if (oldValue && !value) {
        this.showError = false
      }
    }
  }
</script>