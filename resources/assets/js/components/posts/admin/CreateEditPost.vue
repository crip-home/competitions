<template>
  <form-panel :submit="savePost" :title="panelTitle" id="create-edit-post" class="col-md-12">

    <router-link slot="actions" :to="backRoute">Back to list</router-link>

    <form-group id="title" label="Title" :errors="errors.title">
      <input id="title" type="text" class="form-control" name="title" required title="Title"
             v-focus="true" v-model="form.title">
    </form-group>

    <form-group id="image" label="Image" :errors="errors.image">
      <input id="image" type="url" class="form-control" name="image" required title="Image" placeholder="http://image"
             v-model="form.image">
    </form-group>

    <form-group id="body" label="Body" :errors="errors.body">
      <ckeditor v-model="form.body" id="editor-body"></ckeditor>
    </form-group>

    <form-group id="state" label="State" :errors="errors.state">
      <select2 id="state" :options="states" v-model="form.state" :search="false">
        <option disabled value="">Select one</option>
      </select2>
    </form-group>

    <form-group id="publish-at" label="Published At" :errors="errors.publish_at">
      <date-picker v-model="form.publish_at"></date-picker>
      <span class="help-block">If state is 'published' but date is greater than now, post will become available for
        users after date become actual.</span>
    </form-group>

    <form-group id="locale" label="Locale" :errors="errors.locale">
      <select2 id="locale" :options="locales" v-model="form.locale" :search="false"></select2>
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>
  </form-panel>
</template>

<script>
    import Vue from 'vue'
    import Post from './../../../api/posts/Post'
    import posts from './../../../api/posts/admin'
    import * as lang from './../../../lang'
    import * as routes from './../../../router/routes'

    export default {

        mounted() {
            if (this.$route.name === routes.edit_post.name) {
                this.panelTitle = 'Edit post';
                this.fetchPost(this.$route.params.id);
            }
        },

        data() {
            return {
                panelTitle: 'Create post',
                backRoute: routes.list_posts,
                form: {
                    title: '',
                    image: '',
                    body: '',
                    state: '',
                    publish_at: '',
                    locale: Vue.config.lang,
                },
                errors: {},
                locales: lang.select(),
                states: Post.stateSelectOptions(this.$t.bind(this))
            }
        },

        methods: {

            savePost() {
                posts.save(this.post)
                    .then(
                        _ => this.$router.push(routes.list_posts),
                        errors => Vue.set(this, 'errors', errors)
                    );
            },

            fetchPost(id) {
                posts.find(id)
                    .then(post => {
                        this.form = post;
                        this.author = post.author;
                    });
            }

        }

    }
</script>