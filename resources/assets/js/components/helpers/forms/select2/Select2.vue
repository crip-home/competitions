<template>
  <select class="form-control">
    <slot></slot>
  </select>
</template>

<script>
  import { sLog }       from '../../../../ext/Log'
  import Select2Options from './index'

  export default {
    props: {
      value: {type: String},
      options: {type: Select2Options, 'default': _ => []}
    },

    mounted () {
      this.log('mounted')

      const $select = $(this.$el)

      let oldTagVal = ''

      $select
        .select2(this.options)
        .val(this.value)
        .on('change', _ => {
          let isNew = $select.find('[data-select2-tag="true"]')
          let newVal = {val: _ => _}

          if (isNew.length > 0) {
            newVal = $(isNew[isNew.length - 1])
          }

          if (isNew.length > 0 && oldTagVal !== newVal.val()) {
            oldTagVal = newVal.val()
            this.$emit('new', oldTagVal)
          } else {
            this.$emit('input', $select.val())
          }
        })
        .trigger('change')
    },

    methods: {
      log (type, extend = {}) {
        sLog('select2')(type, {
          value: this.value,
          options: this.options,
          search: this.search,
          settings: this.settings,
          ...extend
        }, this.$el)
      }
    },

    watch: {
      value (val) {
        this.log('value updated', {newValue: val})
        let $select = $(this.$el)

        if ($select.val() === val) {
          return
        }

        // update value
        $select
          .val(val)
          .trigger('change')
      },

      options (options) {
        this.log('options updated', {options})
        // update options
        $(this.$el).select2({data: options})
      }
    },

    destroyed () {
      this.log('destroyed')
      $(this.$el).off().select2('destroy')
    }
  }
</script>