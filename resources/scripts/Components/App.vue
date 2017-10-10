<template>
  <div id="app-view">
    <navbar :left-menu="leftNav" :right-menu="rightNav">
      <router-link :to="home" class="navbar-brand">
        {{ $t('appTitle') }}
      </router-link>
    </navbar>

    <div class="container">

      <crip-loading color="rgba(88, 91, 169, 1)"/>

      <transition
          name="fade-horizontal" mode="out-in"
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutRight">
        <router-view class="row"/>
      </transition>

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {home, Route} from '@/Router/Routes'
  import {left as leftNav, right as rightNav} from './Navigation'
  import {AuthService} from '@/Modules/Auth/AuthService'

  @Component({name: 'App'})
  export default class App extends Vue {
    mounted() {
      this.$logger.component(this)
      // Check user authorization when application is mounted.
      AuthService.checkAuth()
    }

    get home(): Route {
      return home
    }

    get leftNav() {
      return leftNav()
    }

    get rightNav() {
      return rightNav()
    }
  }
</script>

<style lang="scss">
  @import "../../../node_modules/animate.css/animate.css";
  @import "../../../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
  @import "../../../node_modules/select2/dist/css/select2.css";
  @import "../../../node_modules/font-awesome/css/font-awesome.css";
  @import "../../sass/app";

  .router-link-active {
    font-weight: bolder !important;
  }
</style>
