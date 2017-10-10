<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">

        <!-- Collapsed Hamburger -->
        <button
            type="button" class="navbar-toggle collapsed" data-toggle="collapse"
            data-target="#app-navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <!-- Branding Image -->
        <slot/>
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">

        <!-- Left Side Of Navbar -->
        <navbar-items
            v-if="hasLeftMenu" :items="leftMenu"
            class="nav navbar-nav"/>

        <!-- Right Side Of Navbar -->
        <navbar-items
            v-if="hasRightMenu" :items="rightMenu"
            class="nav navbar-nav navbar-right"/>

      </div>

    </div>
  </nav>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'
  import {NavGroup} from './index'

  @Component({name: 'TheNavbar'})
  export default class TheNavbar extends Vue {
    @Prop({'type': Array, 'default': () => []})
    public leftMenu: NavGroup[]

    @Prop({'type': Array, 'default': () => []})
    public rightMenu: NavGroup[]

    get hasLeftMenu() {
      return this.leftMenu.length > 0
    }

    get hasRightMenu() {
      return this.rightMenu.length > 0
    }
  }
</script>