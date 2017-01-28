<template>
  <div class="modal fade">
    <div class="modal-dialog" :class="sizeClass">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>

          <h4 class="modal-title">
            <slot name="title"></slot>
          </h4>
        </div>

        <slot></slot>

      </div>
    </div>
  </div>
</template>

<script>
  import { info } from '../../../ext/Log'

  export default {
    props: {
      onHide: {type: Function, required: true},
      onShow: {type: Function, required: false, 'default': _ => _},
      size: {type: String, 'default': _ => ''}
    },

    computed: {
      sizeClass () {
        if (this.size) {
          return {
            [`modal-${this.size}`]: true
          }
        }

        return {}
      }
    },

    mounted () {
      info('modal:mounted', {el: this.$el})
      let $el = $(this.$el)
      $el.modal('show')

      $el.on('hidden.bs.modal', e => {
        this.onHide(e)
      })

      $el.on('shown.bs.modal', () => {
        this.onShow()
      })
    }
  }
</script>