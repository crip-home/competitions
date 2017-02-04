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
  import { modalOpened } from '../../../store/types'

  export default {
    props: {
      onHide: {type: Function, required: true},
      onShow: {type: Function, required: false, 'default': _ => _},
      size: {type: String, 'default': _ => ''},
      id: {type: String, 'default': _ => `modal-${Date.now() * Math.random()}`}
    },

    mounted () {
      info('modal:mounted', {el: this.$el})

      // Register current modal as opened
      this.$store.commit(modalOpened, this.id)

      let $el = $(this.$el)
      $el.modal('show')

      $el.on('hidden.bs.modal', e => {
        this.onHide(e)
      })

      $el.on('shown.bs.modal', () => {
        this.onShow()
      })
    },

    computed: {
      /**
       * Calculate modal size class
       */
      sizeClass () {
        if (this.size) {
          return {
            [`modal-${this.size}`]: true
          }
        }

        return {}
      }
    },

    methods: {
      /**
       * Hide modal
       */
      close () {
        $(this.$el).find('button.close').trigger('click')
      }
    },

    destroyed () {
      // ensure that there is no backdrops when leaving this component
      $('.modal-backdrop').remove()
    },

    watch: {
      '$store.state.modal.modals' (modals) {
        if (modals.indexOf(this.id) === -1) {
          // if modal is not registered in collection, close this instance
          this.close()
        }
      }
    }
  }
</script>