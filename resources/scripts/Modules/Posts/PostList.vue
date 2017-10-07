<template>
  <div>PostList.vue</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({name: 'module-posts-list'})
  export default class PostList extends Vue {
    mounted() {
      this.$logger.component(this)
    }
  }
</script>