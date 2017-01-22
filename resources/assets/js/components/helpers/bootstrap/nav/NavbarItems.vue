<template>
  <ul>
    <template v-for="item in items">
      <navbar-item :item="item" v-if="!item.items"></navbar-item>
      <navbar-group v-else :item="item.parent" :items="item.items"></navbar-group>
    </template>
  </ul>
</template>

<script>
  import NavbarGroup from './NavbarGroup.vue'
  import NavbarItem  from './NavbarItem.vue'

  export default {
    name: 'navbar-items',

    props: {
      items: {type: Array, 'default': () => []}
    },

    components: {
      [NavbarGroup.name]: NavbarGroup,
      [NavbarItem.name]: NavbarItem
    }
  }
</script>