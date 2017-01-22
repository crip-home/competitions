<template>
  <panel class="col-md-12" v-loading="paging.loading">
    <span slot="title"><slot name="title"></slot></span>
    <span slot="actions"><slot name="actions"></slot></span>

    <div slot="pre" class="grid-placeholder">
      <slot></slot>
    </div>

    <paging :paging="paging"></paging>
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

<style>
  .panel-body .pagination,
  .grid-placeholder .table {
    margin: 0;
  }
</style>