<template>
  <div class="form-group v-form-group" :class="{'has-error': !!errors}">
    <label :for="id" :class="labelClass">{{ label }}</label>
    <div :class="controlClass">
      <slot></slot>
      <ul class="help-block" v-if="errors">
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {

        props: {
            label: {type: String, required: true},
            id: {type: String, required: true},
            errors: {type: Array, 'default': null},
            sizeChange: {type: String, 'default': 'lg'},
            size: {type: Number, 'default': 8},
        },

        computed: {

            labelClass() {
                return [`col-${this.sizeChange}-${((12 - this.size) / 2) + 1}`, 'control-label'];
            },

            controlClass() {
                return [`col-${this.sizeChange}-${this.size}`]
            }

        }
    }
</script>