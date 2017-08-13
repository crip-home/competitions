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
      open: {type: Boolean, required: false, default: () => true},

      /**
       * Selectable image size.
       */
      image: {type: String, required: false, default: () => ''}
    },

    mounted () {
      window.filesys = this.fileSelected
    },

    computed: {
      /**
       * FileSys url.
       */
      filesysUrl () {
        return settings.filesysUrl({
          target: 'callback',
          callback: 'filesys',
          image: this.image
        })
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
        // This event is used by .sync modifier.
        this.$emit('update:target', fileUrl)

        // Emit one more event for custom usage of this component.
        this.$emit('selected', fileUrl)

        // Close modal after file is selected.
        this.$store.commit('closeModal', 'filesys-modal')
      }
    }
  }
</script>
