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
            size: {type: Number, 'default': 8},
            sizeMd: {type: Number, 'default': 8}
        },

        computed: {

            controlClass() {
                let classes = [ColCalc.space(this.size, 'lg')];

                if(this.sizeMd)
                    classes.push(ColCalc.space(this.sizeMd, 'md'));

                return classes;
            }

        }
    }
</script>