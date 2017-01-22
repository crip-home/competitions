<template>
  <li :class="classes">
    <router-link v-if="item.route" :to="item.route">{{ item.text }}</router-link>
    <a v-else-if="item.href" :href="item.href">{{ item.text }}</a>
    <a v-else-if="item.click" href @click.prevent="item.click">{{ item.text }}</a>
    <span v-else>{{ item.text }}</span>
  </li>
</template>

<script>
  import { NavbarItem } from './index'

  export default {
    name: 'navbar-item',

    props: {
      item: {type: NavbarItem}
    },

    computed: {
      classes () {
        /** @type {NavbarItem} */
        let item = this.item;
        return {
          'divider': item.divider === true,
          'dropdown-header': !item.route && !item.href && !item.click && !item.divider
        };
      }
    }
  }
</script>