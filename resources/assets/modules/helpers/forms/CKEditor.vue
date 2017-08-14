<template>
  <div class="ckeditor">
    <textarea :id="id" :value="value"></textarea>
  </div>
</template>

<script>
  import settings from '../../../settings'

  export default {

    props: {
      value: {type: String},
      id: {type: String, 'default': 'editor'},
      height: {type: String, 'default': '200px'},
      toolbar: {
        type: Array,
        'default': () => [['Format'], ['Bold', 'Italic'], ['Undo', 'Redo'], ['Image']]
      },
      language: {type: String, 'default': 'en'},
      extraplugins: {type: String, 'default': ''},
      focus: {type: Boolean, 'default': _ => false},
      filesys: {type: Boolean, 'default': _ => false}
    },

    beforeUpdate () {
      const ckeditorId = this.id
      if (this.value !== CKEDITOR.instances[ckeditorId].getData()) {
        CKEDITOR.instances[ckeditorId].setData(this.value)
      }
    },

    mounted () {
      const ckeditorId = this.id
      const ckeditorConfig = {
        toolbar: this.toolbar,
        language: this.language,
        height: this.height,
        extraPlugins: this.extraplugins,
        startupFocus: this.focus
      }

      if (this.filesys) {
        const url = settings.filesysUrl()
        ckeditorConfig.filebrowserBrowseUrl = url
        ckeditorConfig.filebrowserImageBrowseUrl = url
      }

      CKEDITOR.replace(ckeditorId, ckeditorConfig)
      CKEDITOR.instances[ckeditorId].setData(this.value)
      CKEDITOR.instances[ckeditorId].on('change', () => {
        let ckeditorData = CKEDITOR.instances[ckeditorId].getData()
        if (ckeditorData !== this.value) {
          this.$emit('input', ckeditorData)
        }
      })
    },

    destroyed () {
      const ckeditorId = this.id
      if (CKEDITOR.instances[ckeditorId]) {
        CKEDITOR.instances[ckeditorId].destroy()
      }
    }
  }
</script>

<style>
  .ckeditor {
    width: 100%;
    clear: both;
  }
</style>