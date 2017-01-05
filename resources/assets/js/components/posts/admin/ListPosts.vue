<template>
  <panel id="list-posts" class="col-md-12" v-loading="isDataLoading">
    <span slot="title">Manage posts</span>
    <router-link slot="actions" :to="createRoute" class="pull-right">Create New post</router-link>

    <table slot="pre" class="table table-striped table-hover">
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
      <router-link tag="tr" v-for="post in posts" class="pointer" :to="postRoute(post)">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.date_from_now }}</td>
        <td :class="stateClass(post)">{{ post.state }}</td>
        <td>{{ post.author.name }}</td>
      </router-link>
      </tbody>
    </table>

    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :route="pagingRoute"></paging>
  </panel>
</template>

<script>
    import posts from './../../../api/posts/admin'
    import * as routes from './../../../router/routes'

    export default {

        mounted() {
            this.fetchPage(this.$route.params.page || 1);
        },

        data() {
            return {
                posts: [],
                current_page: 0,
                last_page: 0,
                per_page: 0,
                isDataLoading: false,
                pagingRoute: routes.list_posts,
                createRoute: routes.create_post
            };
        },

        methods: {

            fetchPage(page = 1) {
                this.isDataLoading = true;
                posts.get(page, this.per_page)
                    .then(data => {
                        this.posts = [];
                        this.current_page = parseInt(data.current_page);
                        this.last_page = parseInt(data.last_page);
                        this.per_page = parseInt(data.per_page);
                        data.data.forEach(post => this.posts.push(post));
                        this.isDataLoading = false;

                        // this will allow return to page where we last time left
                        routes.list_posts.params ?
                            (routes.list_posts.params.page = this.current_page) :
                            (routes.list_posts.params = {page: this.current_page});
                    });
            },

            postRoute(post) {
                return {
                    name: routes.edit_post.name,
                    params: {
                        id: post.id
                    }
                };
            },

            stateClass(post) {
                switch (post.state) {
                    case 'DRAFT':
                    case 'PENDING':
                        return ['info'];
                    case 'TRASH':
                        return ['danger'];
                    case 'PRIVATE':
                        return ['warning'];
                    default:
                        return [];
                }
            },

        },

        watch: {
            '$route' (to, from) {
                this.fetchPage(to.params.page || 1);
            }
        }
    }
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>