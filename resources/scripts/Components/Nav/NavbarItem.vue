<template>
  <router-link
      v-if="item.route"
      :to="item.route"
      active-class="active"
      tag="li"
  >
    <a v-html="item.text"/>
  </router-link>

  <li v-else-if="!item.route" :class="classes">
    <a
        v-if="item.href"
        :href="item.href"
        v-html="item.text"
        href
    />

    <a
        v-else-if="item.click"
        @click.prevent="item.click"
        v-html="item.text"
        href
    />

    <span v-else v-html="item.text"/>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NavItem} from './index'

  @Component({name: 'NavbarItem'})
  export default class NavbarItem extends Vue {
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