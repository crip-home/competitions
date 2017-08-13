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
  import { api } from './api'
  import * as routes from '../../router/routes'
  import Paging from '../../components/helpers/grid/Paging'

  export default {
    mounted () {
      this.fetchPage(this.$route.params.page || 1)
    },

    data () {
      return {
        paging: new Paging({route: routes.home})
      }
    },

    methods: {
      fetchPage (page) {
        api.get(page, this.paging.perPage)
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
    },

    watch: {
      '$route' (to) {
        this.fetchPage(to.params.page || 1)
      }
    }
  }
</script>