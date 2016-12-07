<template>
  <panel id="list-posts" class="col-md-12">
    <span slot="title">Manage posts</span>

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
      <tr v-for="post in posts" @click.prevent="openEdit(post)" class="pointer">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.date_from_now }}</td>
        <td :class="stateClass(post)">{{ post.state }}</td>
        <td>{{ post.author.name }}</td>
      </tr>
      </tbody>
    </table>

    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :change="openPage"></paging>
  </panel>
</template>

<script>
    import Panel from './../../helpers/Panel.vue'
    import Paging from './../../helpers/Paging.vue'
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
                per_page: 0
            };
        },

        methods: {

            fetchPage(page = 1) {
                this.posts = [];

                posts.get(page, this.per_page)
                    .then(data => {
                        this.current_page = parseInt(data.current_page);
                        this.last_page = parseInt(data.last_page);
                        this.per_page = parseInt(data.per_page);
                        data.data.forEach(post => this.posts.push(post));
                    });
            },

            openPage(page) {
                this.$router.push({name: routes.list_posts.name, params: {page: page}});
            },

            openEdit(post) {
                this.$router.push({name: routes.edit_post.name, params: {id: post.id}});
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
        },

        components: {
            panel: Panel,
            paging: Paging,
        },
    }
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>