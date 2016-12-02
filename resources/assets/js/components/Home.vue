<template>
  <section id="home" class="col-md-12">
    <article class="row" v-for="post in posts">
      <hr>
      <div class="col-md-12">
        <router-link :to="openPost(post)">
          <img :src="post.image" class="img-responsive">
        </router-link>
        <h3>
          <router-link :to="openPost(post)">{{ post.title }}</router-link>
          <small>{{ post.date_from_now }}</small>
        </h3>
        <p>{{ post.short_body }}</p>
      </div>
    </article>
    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :change="fetchPage"></paging>

    <router-view></router-view>
  </section>
</template>

<script>
    import posts from './../api/posts'
    import * as routes from './../router/routes'
    import Paging from './helpers/Paging.vue'
    import {scrollTo} from './helpers/scrollTo'

    export default {

        mounted() {
            this.fetchPage(1);
        },

        data() {
            return {
                current_page: 0,
                last_page: 0,
                per_page: 0,
                posts: []
            }
        },

        methods: {

            fetchPage(page) {
                posts.get(page).then(data => {
                    this.current_page = data.current_page;
                    this.last_page = data.last_page;
                    this.per_page = data.per_page;
                    this.posts = [];
                    scrollTo(document.body, 0, 375);
                    data.data.forEach(post => this.posts.push(post));
                });
            },

            openPost(post) {
                return {
                    name: routes.read_post.name,
                    params: {
                        id: post.id
                    }
                };
            },

        },

        components: {
            paging: Paging
        },

    }
</script>