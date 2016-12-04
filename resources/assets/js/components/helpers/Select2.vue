<template>
  <select class="form-control">
    <slot></slot>
  </select>
</template>

<script>
    export default {

        props: {
            options: {type: Array, 'default': []},
            value: {type: String, required: true},
            search: {type: Boolean, 'default': true}
        },

        mounted() {
            let options = {data: this.options};

            // Allow disable search input
            if (!this.search) {
                options.minimumResultsForSearch = -1;
            }

            $(this.$el)
                .val(this.value)
                .select2(options)
                .on('change', () => this.$emit('input', this.value));
        },

        watch: {

            value(val) {
                // update value
                $(this.$el).select2('val', val);
            },

            options (options) {
                // update options
                $(this.$el).select2({data: options});
            },

        },

        destroyed() {
            $(this.$el).off().select2('destroy');
        },

    }
</script>