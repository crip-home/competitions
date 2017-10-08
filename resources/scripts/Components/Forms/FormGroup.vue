<template>
  <div class="form-group crip-form-group" :class="groupClass">
    <label v-if="label" :for="id" :id="`${id}-label`" :class="labelClass">
      {{ label }}
    </label>
    <div :class="controlClass">
      <slot></slot>
      <form-errors :errors="errors"></form-errors>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import FormErrors from './FormErrors.vue'

  @Component({
    name: 'component-form-group',
    components: {FormErrors}
  })
  export default class FormGroup extends Vue {
    @Prop({'type': String, 'required': true})
    public id: string

    @Prop({'type': String, 'default': () => ''})
    public label: string

    @Prop({'type': Array, 'default': () => []})
    public errors: string[]

    @Prop({'type': Number, 'default': () => 8})
    public colLg: number

    @Prop({'type': Number, 'default': () => 0})
    public colMd: number

    @Prop({'type': Number, 'default': () => 0})
    public colSm: number

    @Prop({'type': Number, 'default': () => 0})
    public colXs: number

    public get labelClass() {
      return this.getColClass('label', ['control-label'])
    }

    public get controlClass() {
      if (this.label == '') {
        return this.getColClass('empty')
      }
      return this.getColClass('control')
    }

    public get groupClass() {
      return {
        'has-error': this.hasErrors
      }
    }

    public get hasErrors() {
      return this.errors.length > 0
    }

    private getColClass(method: 'control' | 'label' | 'empty',
                        initial: string[] = []): string[] {
      ['Lg', 'Md', 'Sm', 'Xs'].forEach(size => {
        const value = this[`col${size}`]
        if (value > 0) {
          initial.push(this[`${method}Calc`](value, size.toLowerCase()))
        }
      })

      return initial
    }

    private labelCalc(size: number, media: string): string {
      return `col-${media}-${this.offset(size)}`
    }

    private controlCalc(size: number, media: string): string {
      return `col-${media}-${size}`
    }

    private emptyCalc(size: number, media: string): string {
      return `col-${media}-${size} col-${media}-offset-${this.offset(size)}`
    }

    private offset(size: number) {
      const availableSpace = 12 - size

      if (availableSpace == 0) return 12

      return availableSpace
      /*
      let col = (availableSpace / 2) + 1
      if ((col + size) >= 12) {
        col -= 1
      }

      return col
      */
    }
  }
</script>