<template>
  <li :class="classes">
    <router-link v-if="item.route" :to="item.route" v-html="item.text"></router-link>
    <a v-else-if="item.href" :href="item.href" v-html="item.text"></a>
    <a v-else-if="item.click" href @click.prevent="item.click" v-html="item.text"></a>
    <span v-else v-html="item.text"></span>
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
        let item = this.item
        return {
          'divider': item.divider === true,
          'dropdown-header': !item.route && !item.href && !item.click && !item.divider
        }
      }
    }
  }
</script>