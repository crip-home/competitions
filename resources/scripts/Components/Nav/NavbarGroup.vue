<template>
  <li>
    <a href class="dropdown-toggle" data-toggle="dropdown">
      {{ item.text }} <span class="caret"></span>
    </a>
    <navbar-items v-if="hasItems" :items="items" class="dropdown-menu"/>
  </li>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NavGroup} from './index'
  import NavbarItems from './NavbarItems.vue'

  @Component({
    name: 'NavbarGroup',
    components: {NavbarItems}
  })
  export default class NavbarGroup extends Vue {
    @Prop({'type': Object, 'required': true})
    public item: { text: string }

    @Prop({'type': Array, 'default': () => []})
    public items: NavGroup[]

    get hasItems() {
      return this.items.length > 0
    }
  }
</script>