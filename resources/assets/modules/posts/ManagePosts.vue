<template>
  <grid id="list-posts" :paging="paging">
    <span slot="title">Manage posts</span>
    <panel-action slot="actions" :to="createRoute">Create New post</panel-action>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Published</th>
        <th>State</th>
        <th>Author</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="post in paging.items">
        <tr :class="paging.rowClasses(post)" @click="paging.select(post)">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}&nbsp;
            <router-link :to="postRoute(post)" class="label label-info actions">Edit</router-link>
          </td>
          <td>{{ post.date_from_now }}</td>
          <td :class="stateClass(post)">{{ post.state }}</td>
          <td>{{ post.author.name }}</td>
        </tr>
      </template>
      </tbody>
    </table>

  </grid>
</template>

<script>
  import posts from '../../api/posts/admin'
  import { createPost, listPosts, editPost } from '../../router/routes'
  import Paging from '../../components/helpers/grid/Paging'

  export default {
    mounted () {
      this.fetchPage(this.$route.params.page || 1)
    },

    data () {
      return {
        paging: new Paging({route: listPosts}),
        createRoute: createPost
      }
    },

    methods: {
      fetchPage (page = 1) {
        this.paging.loading = true
        posts.get(page, this.paging.perPage)
          .then(data => { this.paging.update(data) })
      },

      postRoute (post) {
        return {
          name: editPost.name,
          params: {
            id: post.id
          }
        }
      },

      stateClass (post) {
        switch (post.state) {
          case 'DRAFT':
          case 'PENDING':
            return ['info']
          case 'TRASH':
            return ['danger']
          case 'PRIVATE':
            return ['warning']
          default:
            return []
        }
      }
    },

    watch: {
      '$route' (to) {
        this.fetchPage(to.params.page || 1)
      }
    }
  }
</script>