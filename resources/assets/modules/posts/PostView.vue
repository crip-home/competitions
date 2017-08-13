<template>
  <div id="read-post" class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <h2>
          {{ post.title }}&nbsp;
          <router-link
              class="btn btn-default"
              :to="post.editRoute"
              v-if="canEdit"
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
  import * as getters from '../../store/getters'
  import * as roles from '../../api/auth/roles'
  import auth from '../../api/auth/index'
  import posts from '../../api/posts/index'
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
      ...mapGetters([getters.isAuth, getters.authUser]),

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
        posts.find(id)
          .then(post => {
            this.post = post
            this.author = post.author
          })
      }
    }
  }
</script>