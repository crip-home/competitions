<template>
  <panel class="col-md-12" v-loading="paging.loading">
    <span slot="title"><slot name="title"></slot></span>
    <span slot="actions"><slot name="actions"></slot></span>

    <slot></slot>

    <paging :current-page="paging.current_page"
            :per-page="paging.per_page"
            :last-page="paging.last_page"
            :route="paging.route"></paging>
  </panel>
</template>

<script>
  import Paging from './Paging'

  export default {
      props: {
          paging: {type: Paging}
      }
  }
</script>