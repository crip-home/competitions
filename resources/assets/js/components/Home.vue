<template>
  <section id="home" class="col-md-12">

    <article class="row" v-for="post in posts" :key="post.id">
      <hr>
      <div class="col-md-12">
        <router-link :to="postRoute(post)">
          <img :src="post.image" class="img-responsive" src="">
        </router-link>
        <h3>
          <router-link :to="postRoute(post)">{{ post.title }}</router-link>
          <small>{{ post.date_from_now }}</small>
        </h3>
        <p>{{ post.short_body }}</p>
      </div>
    </article>

    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :route="pagingRoute"></paging>
  </section>
</template>

<script>
    import posts from './../api/posts'
    import * as routes from './../router/routes'

    export default {

        mounted() {
            this.fetchPage(this.$route.params.page || 1);
        },

        data() {
            return {
                current_page: 0,
                last_page: 0,
                per_page: 0,
                posts: [],
                pagingRoute: {name: routes.home.name}
            }
        },

        methods: {

            fetchPage(page) {
                this.posts = [];
                posts.get(page, this.per_page).then(data => {
                    this.current_page = parseInt(data.current_page);
                    this.last_page = parseInt(data.last_page);
                    this.per_page = parseInt(data.per_page);
                    data.data.forEach(post => this.posts.push(post));
                });
            },

            postRoute(post) {
                return {
                    name: routes.read_post.name,
                    params: {
                        id: post.id
                    }
                };
            },

        },

        watch: {
            '$route' (to, from) {
                this.fetchPage(to.params.page || 1);
            }
        }

    }
</script>