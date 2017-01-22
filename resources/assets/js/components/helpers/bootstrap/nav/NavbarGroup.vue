<template>
  <li>
    <a href class="dropdown-toggle" data-toggle="dropdown">
      {{ item.text }} <span class="caret"></span>
    </a>
    <navbar-items v-if="items.length > 0" :items="items" class="dropdown-menu"></navbar-items>
  </li>
</template>

<script>
  import NavbarItems from './NavbarItems.vue'

  export default {
    name: 'navbar-group',

    props: {
      item: {type: Object},
      items: {type: Array, 'default': () => []},
    }
  }
</script>