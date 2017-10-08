<template>
  <div>
    <span>PostList.vue</span>
    <form class="form-horizontal">
      <form-group id="text" label="Some label content">
        <input type="text" id="text" class="form-control">
      </form-group>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import FormGroup from '@/Components/Forms/FormGroup.vue'

  @Component({
    name: 'module-posts-list',
    components: {FormGroup}
  })
  export default class PostList extends Vue {
    mounted() {
      // this.$logger.component()
    }
  }
</script>