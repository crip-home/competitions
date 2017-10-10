<template>
  <div>
    <span>PostList.vue</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import FormGroup from '@/Components/Forms/FormGroup.vue'

  @Component({
    name: 'PostList',
    components: {FormGroup}
  })
  export default class PostList extends Vue {
    mounted() {
      this.$logger.component(this)
    }
  }
</script>