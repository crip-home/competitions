<template>
  <div id="app-view">
    <div class="container">

      <crip-loading color="rgba(88, 91, 169, 1)"></crip-loading>

      <transition
          name="fade-horizontal" mode="out-in"
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutRight">
        <router-view class="row"></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({name: 'component-app'})
  export default class App extends Vue {
    mounted() {
      this.$logger.component(this)
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
