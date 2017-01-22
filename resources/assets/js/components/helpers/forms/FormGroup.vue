<template>
  <div class="form-group v-form-group" :class="{'has-error': !!errors}">
    <label :for="id" :id="id + '-label'" :class="labelClass">{{ label }}</label>
    <div :class="controlClass">
      <slot></slot>
      <form-errors :errors="errors"></form-errors>
    </div>
  </div>
</template>

<script>
  import ColCalc from './ColCalc'

  export default {
    props: {
      label: {type: String, required: true},
      id: {type: String, required: true},
      errors: {type: Array, 'default': null},
      colLg: {type: Number, 'default': 8},
      colMd: {type: Number, 'default': 0},
      colSm: {type: Number, 'default': 0}
    },

    computed: {
      labelClass () {
        return this.resolveSizes('label', ['control-label'])
      },

      controlClass () {
        return this.resolveSizes('control', [])
      }
    },

    methods: {
      /**
       *
       * @param {String} method
       * @param {Array} [initialClasses]
       * @returns {Array}
       */
      resolveSizes (method, initialClasses = []) {
        if (this.colLg) {
          initialClasses.push(ColCalc[method](this.colLg, 'lg'))
        }

        if (this.colMd) {
          initialClasses.push(ColCalc[method](this.colMd, 'md'))
        }

        if (this.colSm) {
          initialClasses.push(ColCalc[method](this.colSm, 'sm'))
        }

        return initialClasses
      }
    }
  }
</script>