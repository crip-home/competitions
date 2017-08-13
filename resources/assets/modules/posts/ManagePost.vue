<template>
  <form-panel
      id="create-edit-post"
      :submit="savePost"
      :title="panelTitle"
      class="col-md-12"
  >
    <panel-action slot="actions" :to="backRoute">Back to list</panel-action>

    <form-group id="title" label="Title" :errors="errors.title">
      <input
          id="title"
          type="text"
          class="form-control"
          name="title"
          required
          title="Post title"
          v-focus="true"
          v-model="form.title"
      >
    </form-group>

    <form-group id="image" label="Image" :errors="errors.image">
      <div class="input-group">
        <input
            id="image"
            type="url"
            class="form-control"
            name="image"
            required
            title="Image"
            disabled
            placeholder="http://image"
            v-model="form.image"
        >
        <span class="input-group-btn">
          <button
              class="btn btn-default"
              type="button"
              @click="openFilesys"
          >File</button>
        </span>
      </div>
    </form-group>

    <form-group id="body" label="Body" :errors="errors.body">
      <ckeditor v-model="form.body" id="editor-body" :filesys="true"></ckeditor>
    </form-group>

    <form-group id="state" label="State" :errors="errors.state">
      <select2 id="state" :options="states" v-model="form.state">
        <option disabled value="">Select one</option>
      </select2>
    </form-group>

    <form-group
        id="publish-at"
        label="Published At"
        :errors="errors.publish_at"
    >
      <date-picker v-model="form.publish_at"></date-picker>
      <span class="help-block">
        If state is 'published' but date is greater than now, post will become
        available for users after date become actual.
      </span>
    </form-group>

    <form-group id="locale" label="Locale" :errors="errors.locale">
      <select2 id="locale" :options="locales" v-model="form.locale"></select2>
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

    <filesys-modal
        :target.sync="form.image"
        :open.sync="filesysIsOpen"
        image="post-title"
    ></filesys-modal>

  </form-panel>
</template>

<script>
  import Vue from 'vue'
  import Post from '../../entities/Post'
  import posts from '../../api/posts/admin'
  import * as lang from '../../lang/index'
  import * as routes from '../../router/routes'

  export default {
    mounted () {
      if (this.$route.name === routes.editPost.name) {
        this.panelTitle = 'Edit post'
        this.fetchPost(this.$route.params.id)
      }
    },

    data () {
      return {
        panelTitle: 'Create post',
        backRoute: routes.listPosts,
        form: {
          title: '',
          image: '',
          body: '',
          state: '',
          publish_at: '',
          locale: Vue.config.lang
        },
        errors: {},
        locales: lang.select(),
        states: Post.stateSelectOptions(this.$t.bind(this)),
        filesysIsOpen: false
      }
    },

    methods: {
      /**
       * Save post details with server API.
       */
      savePost () {
        posts.save(this.form)
          // Redirect to admin posts list when new post is saved.
          .then(() => { this.$router.push(routes.listPosts) })
          // Display errors if server validation failed.
          .catch(errors => { this.errors = errors })
      },

      /**
       * Fetch post details from server API.
       */
      fetchPost (id) {
        posts.find(id)
          .then(post => { this.form = post })
      },

      /**
       * Open FileSys modal for a file select.
       */
      openFilesys () {
        this.filesysIsOpen = true
      }
    }
  }
</script>