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
          mode="out-in"
          name="fade-horizontal"
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
  import {Watch} from 'vue-property-decorator'
  import {home, Route} from '@/Router/Routes'
  import {left as leftNav, right as rightNav} from './Navigation'
  import {AuthService} from '@/Modules/Auth/AuthService'

  @Component({name: 'App'})
  export default class App extends Vue {
    public async mounted() {
      this.$logger.component(this)
      // Check user authorization when application is mounted.
      await AuthService.checkAuth()
    }

    public get home(): Route {
      return home
    }

    public get leftNav() {
      return leftNav()
    }

    public get rightNav() {
      return rightNav()
    }

    private redirectAuthenticated() {
      // If user has redirected here by guard, redirect him back
      // to guarded route instead of home page.
      if (this.$route.query && this.$route.query['redirect']) {
        this.$router.push(this.$route.query['redirect'])
        return
      }

      this.$router.push(home)
    }

    @Watch('$store.state.auth.user.authenticated')
    private onAuthenticated(value: boolean) {
      // Watching user details, because they arrives later than route
      // guard redirects to login and in case we receive them, we can
      // redirect him to requested route.
      if (value) {
        this.redirectAuthenticated()
      }
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
