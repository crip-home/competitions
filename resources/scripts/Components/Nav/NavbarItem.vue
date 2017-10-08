<template>
  <router-link
      v-if="item.route" :to="item.route" tag="li"
      active-class="active">

    <a v-html="item.text"></a>

  </router-link>
  <li :class="classes" v-else-if="!item.route">

    <a href v-if="item.href" :href="item.href"
       v-html="item.text"></a>

    <a href v-else-if="item.click" @click.prevent="item.click"
       v-html="item.text"></a>

    <span v-else v-html="item.text"></span>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NavItem} from './index'

  @Component({name: 'component-navbar-item'})
  export default class Navbar extends Vue {
    @Prop({'type': NavItem, 'required': true})
    public item: NavItem

    get classes() {
      const hasAction =
        this.item.route || this.item.href ||
        this.item.click || this.item.divider

      return {
        'active': this.item.isActive,
        'divider': this.item.divider === true,
        'dropdown-header': !hasAction
      }
    }
  }
</script>