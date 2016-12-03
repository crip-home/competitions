<template>
  <div id="create-edit-post" class="col-md-12">
    <ckeditor v-model="body" id="editor-body-content"></ckeditor>
    <code v-html="body"></code>
  </div>
</template>

<script>
    import CKEditor from './../helpers/CKEditor.vue'

    export default {

        data() {
            return {
                body: 'text in editor'
            }
        },

        components: {
            ckeditor: CKEditor
        },

    }
</script>