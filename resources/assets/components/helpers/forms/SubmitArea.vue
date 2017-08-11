<template>
  <div class="form-group v-submit-area">
    <div :class="controlClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ColCalc from './ColCalc'

  export default {
    props: {
      colLg: {type: Number, 'default': 8},
      colMd: {type: Number, 'default': 0},
      colSm: {type: Number, 'default': 0}
    },

    computed: {
      controlClass () {
        let classes = []

        if (this.colLg) {
          classes.push(ColCalc.space(this.colLg, 'lg'))
        }

        if (this.colMd) {
          classes.push(ColCalc.space(this.colMd, 'md'))
        }

        if (this.colSm) {
          classes.push(ColCalc.space(this.colSm, 'sm'))
        }

        return classes
      }
    }
  }
</script>