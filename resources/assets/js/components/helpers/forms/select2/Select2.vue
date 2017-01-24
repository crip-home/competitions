<template>
  <select class="form-control">
    <slot></slot>
  </select>
</template>

<script>
  import { sLog }       from '../../../../ext/Log'
  import ext            from '../../../../ext'
  import Select2Options from './index'

  export default {
    props: {
      value: {type: String},
      options: {type: Select2Options, 'default': _ => []}
    },

    mounted () {
      this.log('mounted')
      const $select = $(this.$el)
      this.compile($select)
    },

    data () {
      return {
        oldTagVal: ''
      }
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
      },

      compile ($select) {
        $select
          .select2(this.options)
          .val(this.value)
          .on('change', this.onChange.bind(this, $select))
          .trigger('change')

        this.compiled($select)
      },

      /**
       * Do post actions after select2 is binded in dom
       *
       * @param $select
       */
      compiled ($select) {
        if (this.options.initialSelection && ext.isFunction(this.options.initialSelection)) {
          this.options.initialSelection((text, value, defaultSelected = true, selected = true) => {
            let option = new Option(text, value, defaultSelected, selected)
            $select.append(option)
          })

          $select.trigger('change')
        }
      },

      /**
       * Actions to be done an select2 change event
       *
       * @param $select
       */
      onChange ($select) {
        const isNew = $select.find('[data-select2-tag="true"]')
        let newVal = {val: _ => _}

        if (isNew.length > 0) {
          newVal = $(isNew[isNew.length - 1])
        }

        if (isNew.length > 0 && this.oldTagVal !== newVal.val()) {
          this.oldTagVal = newVal.val()
          this.$emit('new', this.oldTagVal)
        } else {
          this.$emit('input', $select.val())
        }
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