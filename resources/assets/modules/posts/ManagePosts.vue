<template>
  <grid id="list-posts" :paging="paging">
    <span slot="title">Manage posts</span>
    <panel-action slot="actions" :to="createRoute">
      Create New post
    </panel-action>

    <table class="table table-hover">
      <thead>
      <tr>
        <th><sort-th :paging="paging" column="id">#</sort-th></th>
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
            <router-link :to="postRoute(post)" class="label label-info actions">
              Edit
            </router-link>
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
  import { managePosts } from './api'
  import { createPost, listPosts, editPost } from '../../router/routes'
  import Paging from '../helpers/grid/Paging'

  export default {
    name: 'manage-posts',

    data () {
      return {
        paging: new Paging(this, {route: listPosts}),
        createRoute: createPost
      }
    },

    created () {
      this.$log.component(this)
      this.paging.init(page => this.fetchPage(page), this.page)
    },

    computed: {
      page () { return this.$route.params.page || 1 }
    },

    methods: {
      fetchPage (page = 1) {
        this.paging.loading = true
        managePosts.get(page, this.paging.perPage)
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
    }
  }
</script>