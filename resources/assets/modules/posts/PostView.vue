<template>
  <div id="read-post" class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <h2>
          {{ post.title }}&nbsp;
          <router-link
              class="btn btn-default" :to="post.editRoute" v-if="canEdit"
          >
            Edit
          </router-link>
        </h2>
        <img :src="post.image" class="img-responsive">
        <h3>Posted by {{ author.name }}
          <small>{{ post.date_from_now }}</small>
        </h3>
        <div v-html="post.body"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as roles from '../../api/roles'
  import auth from '../auth/api'
  import { api } from './api'
  import { mapGetters } from 'vuex'

  export default {
    mounted () {
      this.fetchPost(this.$route.params.id)
    },

    data () {
      return {
        post: {},
        author: {}
      }
    },

    computed: {
      ...mapGetters(['isAuth', 'authUser']),

      /**
       * Can currently authorized user edit this post instance.
       * @return {boolean}
       */
      canEdit () {
        if (!this.post.id || !this.isAuth) return false

        if (auth.middleware.hasRole(roles.MANAGE_POSTS)) {
          return true
        }

        return !!(
          auth.middleware.hasRole(roles.CREATE_POST) &&
          this.authUser.id === this.author.id
        )
      }
    },

    methods: {
      fetchPost (id) {
        api.find(id)
          .then(post => {
            this.post = post
            this.author = post.author
          })
      }
    }
  }
</script>