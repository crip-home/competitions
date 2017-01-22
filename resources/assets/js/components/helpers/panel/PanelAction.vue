<template>
  <router-link :to="to" class="btn btn-default btn-xs">
    <slot></slot>
  </router-link>
</template>

<script>
  export default {
    props: {
      to: {'default': _ => {}}
    }
  }
</script>