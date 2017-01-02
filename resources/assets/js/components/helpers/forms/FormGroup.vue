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
    import ColCalc from './ColCalc'

    export default {

        props: {
            label: {type: String, required: true},
            id: {type: String, required: true},
            errors: {type: Array, 'default': null},
            size: {type: Number, 'default': 8},
            sizeMd: {type: Number, 'default': 8}
        },

        computed: {

            labelClass() {
                let classes = [
                    ColCalc.label(this.size, 'lg'),
                    'control-label'
                ];

                if(this.sizeMd)
                    classes.push(ColCalc.label(this.sizeMd, 'md'));

                return classes;
            },

            controlClass() {
                let classes = [
                    ColCalc.control(this.size, 'lg')
                ];

                if(this.sizeMd)
                    classes.push(ColCalc.control(this.sizeMd, 'md'));

                return classes;
            }

        }
    }
</script>