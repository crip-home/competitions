<template>
  <input class="v-datepicker form-control" type="text" :value="value">
</template>

<script>
    export default {

        props: {
            value: {type: String},
        },

        mounted() {
            $(this.$el).datepicker({
                format: 'yyyy-mm-dd'
            });
        },

        destroyed() {
            $(this.$el).datepicker('destroy');
        },

    }
</script>