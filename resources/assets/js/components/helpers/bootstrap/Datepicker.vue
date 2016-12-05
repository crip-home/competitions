<template>
  <input class="v-datepicker form-control" type="text" :value="value">
</template>

<script>
    export default {

        props: {
            value: {type: String},
        },

        mounted() {
            const $datepicker = $(this.$el);
            $datepicker
                .datepicker({ format: 'yyyy-mm-dd'})
                .on('changeDate', () => this.$emit('input', $datepicker.val()));
        },

        destroyed() {
            $(this.$el).datepicker('destroy');
        },

    }
</script>