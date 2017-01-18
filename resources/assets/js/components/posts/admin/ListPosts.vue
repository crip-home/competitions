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
      <template v-for="post in posts">
        <tr class="pointer with-hidden-actions" :class="{active: selected.id == post.id}" @click="select(post)">
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

    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :route="pagingRoute"></paging>
  </panel>
</template>

<script>
    import posts from './../../../api/posts/admin'
    import {create_post, list_posts, edit_post} from './../../../router/routes'

    export default {

        mounted() {
            this.fetchPage(this.$route.params.page || 1);
        },

        data() {
            return {
                posts: [],
                selected: {},
                current_page: 0,
                last_page: 0,
                per_page: 0,
                isDataLoading: false,
                pagingRoute: list_posts,
                createRoute: create_post
            };
        },

        methods: {

            fetchPage(page = 1) {
                this.isDataLoading = true;
                posts.get(page, this.per_page)
                    .then(data => {
                        this.current_page = data.current_page;
                        this.last_page = data.last_page;
                        this.per_page = data.per_page;
                        this.posts = data.items;
                        this.isDataLoading = false;

                        // this will allow return to page where we last time left
                        list_posts.params ?
                            (list_posts.params.page = this.current_page) :
                            (list_posts.params = {page: this.current_page});
                    });
            },

            /**
             * @param {Post} post
             */
            select(post) {
                this.selected = post;
            },

            postRoute(post) {
                return {
                    name: edit_post.name,
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