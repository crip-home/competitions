<template>
  <div id="read_post" class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <h2>{{ post.title }}</h2>
        <img :src="post.image" class="img-responsive">
        <h3>Posted by {{ author.name }} <small>{{ post.date_from_now }}</small></h3>
        <div v-html="post.body"></div>
      </div>
    </div>

  </div>
</template>

<script>
    import posts from './../../api/posts'

    export default {
        mounted() {
            this.fetchPost(this.$route.params.id);
        },

        data() {

            return {
                post: {},
                author: {}
            }

        },

        methods: {

            fetchPost(id) {
                posts.find(id)
                    .then(post => {
                        this.post = post;
                        this.author = post.author;
                    });
            }

        }
    }
</script>