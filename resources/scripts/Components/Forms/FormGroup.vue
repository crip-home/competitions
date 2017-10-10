<template>
  <div :class="groupClass" class="form-group crip-form-group">
    <label
        v-if="label"
        :for="id"
        :id="`${id}-label`"
        :class="labelClass"
    >
      {{ label }}
    </label>
    <div :class="controlClass">
      <slot/>
      <form-errors :errors="errors"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import Utils from '@/Helpers/Utils'
  import FormErrors from './FormErrors.vue'

  @Component({
    name: 'FormGroup',
    components: {FormErrors},
  })
  export default class FormGroup extends Vue {
    @Prop({'type': String, 'required': true})
    public 'for': string
    public id = this.for

    @Prop({'type': String, 'default': () => ''})
    public label: string

    @Prop({'type': Array, 'default': () => []})
    public errors: string[]

    @Prop({'type': Number, 'default': () => 0})
    public colLg: number

    @Prop({'type': Number, 'default': () => 0})
    public colMd: number

    @Prop({'type': Number, 'default': () => 0})
    public colSm: number

    @Prop({'type': Number, 'default': () => 12})
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

    private labelCalc(size: number, media: string, asOffset = false): string {
      return this.colClass(this.offset(size), media, asOffset)
    }

    private controlCalc(size: number, media: string): string {
      return this.colClass(size, media)
    }

    private colClass(size: number, media: string, offset = false) {
      let template = offset ?
        'col-{media}-offset-{size}' :
        'col-{media}-{size}'

      return Utils.supplant(template, {media, size})
    }

    private emptyCalc(size: number, media: string): string {
      const control = this.controlCalc(size, media)
      const offset = this.labelCalc(size, media, true)
      return `${control} ${offset}`
    }

    private offset(size: number) {
      const availableSpace = 12 - size

      if (availableSpace == 0) return 0

      return availableSpace
    }
  }
</script>