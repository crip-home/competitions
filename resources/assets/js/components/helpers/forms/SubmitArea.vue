<template>
  <div class="form-group v-submit-area">
    <div :class="controlClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {

        props: {
            sizeChange: {type: String, 'default': 'lg'},
            size: {type: Number, 'default': 8},
        },

        computed: {

            controlClass() {
                return [
                    `col-${this.sizeChange}-${this.size}`,
                    `col-${this.sizeChange}-offset-${((12 - this.size) / 2) + 1}`
                ];
            }

        }
    }
</script>