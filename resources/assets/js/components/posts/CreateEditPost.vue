<template>
  <panel :submit="savePost" title="Create post" id="create-edit-post" class="col-md-12">
    <form-group id="title" label="Title" :errors="errors.title">
      <input id="title" type="text" class="form-control" name="title" required v-model="post.title">
    </form-group>

    <form-group id="image" label="Image" :errors="errors.image">
      <input id="image" type="url" class="form-control" name="image" required v-model="post.image">
    </form-group>

    <form-group id="body" label="Body" :errors="errors.body">
      <ckeditor v-model="post.body" id="editor-body"></ckeditor>
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>
  </panel>
</template>

<script>
    import CKEditor from './../helpers/CKEditor.vue'
    import Panel from './../helpers/forms/Panel.vue'
    import FormGroup from './../helpers/forms/FormGroup.vue'
    import SubmitArea from './../helpers/forms/SubmitArea.vue'

    export default {

        data() {
            return {
                post: {
                    title: '',
                    image: '',
                    body: '',
                },

                errors: {
                    title: null,
                    image: null,
                    body: null
                },
            }
        },

        methods: {

            savePost() {

            }

        },

        components: {
            ckeditor: CKEditor,
            panel: Panel,
            formGroup: FormGroup,
            submit: SubmitArea
        },

    }
</script>