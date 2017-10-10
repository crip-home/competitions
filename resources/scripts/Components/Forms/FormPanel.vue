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
  import {Prop} from 'vue-property-decorator'
  import Utils from '@/Helpers/Utils'

  @Component({name: 'FormPanel'})
  export default class FormPanel extends Vue {
    @Prop({'type': String, 'required': true})
    public title: string

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

    public get contentClass(): string[] {
      return this.calculateColClass('bodyCol{size}')
    }

    public get elementClass() {
      return this.calculateColClass('col{size}')
    }

    public submit() {
      this.$emit('submit')
    }

    private calculateColClass(selectorTemplate: string): string[] {
      const result = [];
      ['Lg', 'Md', 'Sm', 'Xs'].forEach(size => {
        const valueKey = Utils.supplant(selectorTemplate, {size})
        const value = this[valueKey]

        // Skip zero values to avoid un-required classes
        if (value <= 0) return

        const offset = parseInt(((12 - value) / 2).toString())
        const sizeKey = size.toLowerCase()
        result.push(`col-${sizeKey}-offset-${offset}`)
        result.push(`col-${sizeKey}-${value}`)

      })

      return result
    }
  }
</script>