<template>
  <select class="form-control">
    <slot></slot>
  </select>
</template>

<script>
    export default {

        props: {
            value: {type: String},
            options: {type: Array, 'default': []},
            search: {type: Boolean, 'default': true}
        },

        mounted() {
            let options = {data: this.options};

            // Allow disable search input
            if (!this.search) {
                options.minimumResultsForSearch = -1;
            }

            const $select = $(this.$el);

            $select
                .select2(options)
                .val(this.value)
                .on('change', () => {
                    this.$emit('input', $select.val())
                });
        },

        watch: {

            value(val) {
                // update value
                $(this.$el).select2().val(val);
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