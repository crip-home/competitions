<template>
  <div class="modal fade">
    <div class="modal-dialog" :class="sizeClass">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;
          </button>

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
  import { modalOpened } from '../../../store/types'

  export default {
    name: 'modal',

    props: {
      /**
       * The size of modal component.
       */
      size: {type: String, 'default': () => ''},

      /**
       * Unique identifier of teh modal.
       */
      id: {type: String, 'default': () => `modal-${Date.now() * Math.random()}`}
    },

    mounted () {
      this.$emit('mounted', this.id)

      // Register current modal as opened
      this.$store.commit(modalOpened, this.id)

      let $el = $(this.$el)
      $el.modal('show')

      $el.on('hidden.bs.modal', e => {
        this.$emit('hidden', e)
      })

      $el.on('shown.bs.modal', () => {
        this.$emit('shown')
      })
    },

    computed: {
      /**
       * Calculate modal size class.
       */
      sizeClass () {
        if (this.size) {
          return [`modal-${this.size}`]
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
      this.$emit('destroyed', this.id)

      // Ensure that there is no backdrops when leaving this component.
      $('.modal-backdrop').remove()
    },

    watch: {
      '$store.state.modal.modals' (modals) {
        if (modals.indexOf(this.id) === -1) {
          // If modal is no longer registered in collection of modals, close
          // this instance.
          this.close()
        }
      }
    }
  }
</script>