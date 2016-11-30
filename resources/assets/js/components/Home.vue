<template>
  <div>
    <h4>Home.vue</h4>
    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :change="fetchPage"></paging>
  </div>
</template>

<script>
    import posts from './../api/posts'
    import Paging from './helpers/Paging.vue'

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
                    data.data.forEach(post => this.posts.push(post));
                });
            }

        },

        components: {
            paging: Paging
        },

    }
</script>