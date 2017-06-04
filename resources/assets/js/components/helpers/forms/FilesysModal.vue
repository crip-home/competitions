<template>
  <div v-if="open">
    <modal @hidden="onHide" @shown="onShow" id="filesys-modal" size="lg">
      <span slot="title">Upload and select a file</span>

      <div>
        <div class="embed-responsive embed-responsive-4by3">
          <iframe class="embed-responsive-item" :src="filesysUrl"></iframe>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import settings from '../../../settings'
  import { closeModal } from '../../../store/types'

  export default {
    name: 'filesys-modal',

    props: {
      /**
       * Target model property to be updated on file select.
       */
      target: {type: String, required: true},

      /**
       * Current state of model visibility.
       */
      open: {type: Boolean, required: false, default: () => true}
    },

    mounted () {
      window.filesys = this.fileSelected
    },

    computed: {
      filesysUrl () {
        return settings.filesysUrl('callback', 'filesys')
      }
    },

    methods: {
      /**
       * When modal fires hidden event.
       */
      onHide () {
        // Emit event that sets open state now is set to false.
        this.$emit('update:open', false)
      },

      /**
       * When modal fires shown event.
       */
      onShow () {
        // Emit event that sets open state now is set to true.
        this.$emit('update:open', true)
      },

      /**
       * When FileSys file is selected, this method will be called.
       * @param {String} fileUrl
       */
      fileSelected (fileUrl) {
        // Emit event that sets target state now is set to selected file url.
        this.$emit('update:target', fileUrl)

        // Close modal after file is selected.
        this.$store.commit(closeModal, 'filesys-modal')
      }
    }
  }
</script>
