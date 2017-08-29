<template>
  <section id="home" class="col-md-12">

    <article class="row" v-for="post in paging.items" :key="post.id">
      <hr>
      <div class="col-md-12">
        <router-link :to="postRoute(post)">
          <img :src="post.image" class="img-responsive">
        </router-link>
        <h3>
          <router-link :to="postRoute(post)">{{ post.title }}</router-link>
          <small>{{ post.date_from_now }}</small>
        </h3>
        <p>{{ post.short_body }}</p>
      </div>
    </article>

    <paging :paging="paging"></paging>

  </section>
</template>

<script>
  import { posts } from './api'
  import * as routes from '../../router/routes'
  import Paging from '../../components/grid/Paging'

  export default {
    name: 'posts',

    data () {
      return {
        paging: new Paging(this, {route: routes.home})
      }
    },

    created () {
      this.$log.component(this)
      this.paging.init(() => this.fetchPage())
    },

    methods: {
      fetchPage () {
        posts.get(this.paging)
          .then(data => this.paging.update(data))
      },

      postRoute (post) {
        return {
          name: routes.readPost.name,
          params: {
            id: post.id
          }
        }
      }
    }
  }
</script>