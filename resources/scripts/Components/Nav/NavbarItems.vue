<template>
  <ul>
    <template v-for="item in items">
      <navbar-item v-if="!item.items" :item="item"/>
      <navbar-group
          v-else
          :item="item.parent"
          :items="item.items"
      />
    </template>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NavGroup} from './'

  @Component({name: 'NavbarItems'})
  export default class NavbarItems extends Vue {
    @Prop({'type': Array, 'default': () => []})
    public items: NavGroup[]
  }
</script>