<template>
  <select class="form-control">
    <slot></slot>
  </select>
</template>

<script>
    import {sLog, info} from './../../ext/Log'

    export default {

        props: {
            value: {type: String},
            options: {type: Array, 'default': []},
            search: {type: Boolean, 'default': true}
        },

        mounted() {
            this.log('mounted');
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
                })
                .trigger('change');
        },

        methods: {

            log(type, extend = {}) {
                sLog('select2')(type, {
                    value: this.value,
                    options: this.options,
                    search: this.search,
                    ...extend
                }, this.$el);
            }

        },

        watch: {

            value(val) {
                this.log('value updated', {newValue: val});
                // update value
                $(this.$el)
                    .val(val)
                    .trigger('change');
            },

            options (options) {
                this.log('options updated', {newValue: val});
                // update options
                $(this.$el).select2({data: options});
            },

        },

        destroyed() {
            this.log('destroyed');
            $(this.$el).off().select2('destroy');
        },

    }
</script>