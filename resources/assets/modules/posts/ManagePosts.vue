<template>
  <grid id="list-posts" :paging="paging">
    <span slot="title">Manage posts</span>
    <panel-action slot="actions" :to="createRoute">
      Create New post
    </panel-action>

    <table class="table table-hover">
      <thead>
      <tr>
        <sort-th :paging="paging" column="id">#</sort-th>
        <sort-th :paging="paging" column="title">Title</sort-th>
        <sort-th :paging="paging" column="published_at">Published</sort-th>
        <sort-th :paging="paging" column="state">State</sort-th>
        <sort-th :paging="paging" column="author_name">Author</sort-th>
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
  import api from './api-posts-manage'
  import mixin from './../../extensions/component-mixin'
  import Paging from '../../components/grid/Paging'
  import { createPost, listPosts, editPost } from '../../router/routes'

  export default {
    name: 'manage-posts',

    mixins: [mixin],

    data () {
      return {
        paging: new Paging(this, {route: listPosts}),
        createRoute: createPost
      }
    },

    created () {
      this.paging.init(() => this.fetchPage())
    },

    methods: {
      async fetchPage () {
        this.paging.loading = true
        const result = await api.get(this.paging)
        this.paging.update(result)
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