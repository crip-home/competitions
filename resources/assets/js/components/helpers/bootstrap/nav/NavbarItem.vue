<template>
  <li>
    <router-link v-if="item.route" :to="item.route">{{ item.text }}</router-link>
    <a v-else-if="item.href" :href="item.href">{{ item.text }}</a>
    <a v-else-if="item.click" href @click.prevent="item.click">{{ item.text }}</a>
  </li>
</template>

<script>
    export default {
        name: 'navbar-item',

        props: {
            item: {type: Object}
        },

        mounted() {
            console.log('navbarItem', this.item);
        }
    }
</script>