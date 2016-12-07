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

    <form-group id="state" label="State" :errors="errors.state">
      <select2 id="state" :options="state.options" v-model="post.state" :search="false">
        <option disabled selected value="">Select one</option>
      </select2>
    </form-group>

    <form-group id="publish-at" label="Published At" :errors="errors.publish_at">
      <date v-model="post.publish_at"></date>
      <span class="help-block">If state is 'published' but date is greater than now, post will become available for
        users after date become actual.</span>
    </form-group>

    <form-group id="locale" label="Locale" :errors="errors.locale">
      <select2 id="locale" :options="locale.options" v-model="post.locale" :search="false"></select2>
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>
  </panel>
</template>

<script>
    import Vue from 'vue'
    import post from './../../../api/posts/admin'
    import * as lang from './../../../lang'
    import * as routes from './../../../router/routes'

    import CKEditor from './../../helpers/CKEditor.vue'
    import Panel from './../../helpers/forms/Panel.vue'
    import FormGroup from './../../helpers/forms/FormGroup.vue'
    import SubmitArea from './../../helpers/forms/SubmitArea.vue'
    import Datepicker from './../../helpers/bootstrap/Datepicker.vue'
    import Select2 from './../../helpers/Select2.vue'

    export default {

        mounted() {
            this.post.locale = Vue.config.lang;
            Object.keys(lang.locales).forEach((locale) =>
                this.locale.options.push({id: lang.locales[locale].key, text: lang.locales[locale].text}));
        },

        data() {
            return {
                post: {
                    title: '',
                    image: '',
                    body: '',
                    state: '',
                    publish_at: '',
                    locale: '',
                },

                errors: {},

                locale: {
                    options: []
                },

                state: {
                    //TODO: this should come in from server api
                    options: [
                        {id: 'DRAFT', text: 'Draft'},
                        {id: 'PENDING', text: 'Pending'},
                        {id: 'PRIVATE', text: 'Private'},
                        {id: 'PUBLISHED', text: 'Published'},
                        {id: 'TRASH', text: 'Trash'},
                    ]
                }
            }
        },

        methods: {

            savePost() {
                post.save(this.post)
                    .then(
                        () => this.$router.push(routes.home),
                        errors => Vue.set(this, 'errors', errors)
                    );
            },

        },

        components: {
            ckeditor: CKEditor,
            panel: Panel,
            formGroup: FormGroup,
            submit: SubmitArea,
            date: Datepicker,
            select2: Select2
        },

    }
</script>