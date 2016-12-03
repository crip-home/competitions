<template>
  <div id="app-view">
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">

          <!-- Collapsed Hamburger -->
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#app-navbar-collapse">
            <span class="sr-only">{{ $t('app.toggle_nav') }}</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <!-- Branding Image -->
          <router-link :to="{ name: 'home' }" class="navbar-brand">{{ $t('app.title') }}</router-link>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
          <!-- Left Side Of Navbar -->
          <ul class="nav navbar-nav">&nbsp;</ul>

          <!-- Right Side Of Navbar -->
          <ul class="nav navbar-nav navbar-right">

            <li v-if="!user.authenticated">
              <router-link :to="{ name: 'login' }">{{ $t('app.login') }}</router-link>
            </li>

            <li v-if="!user.authenticated">
              <router-link :to="{ name: 'signup' }">{{ $t('app.signup') }}</router-link>
            </li>

            <li class="dropdown" v-if="user.authenticated">
              <a href class="dropdown-toggle" data-toggle="dropdown">
                {{ user_name }} <span class="caret"></span>
              </a>

              <ul class="dropdown-menu" role="menu">
                <li>
                  <a href @click.prevent="logout">{{ $t('app.logout') }}</a>
                </li>
                <!--<li>
                  <a href @click.prevent="toast">Toast</a>
                </li>-->
              </ul>
            </li>

            <li class="dropdown">
              <a href class="dropdown-toggle" data-toggle="dropdown">
                {{ $t('locale') }} <span class="caret"></span>
              </a>

              <ul class="dropdown-menu">
                <li v-for="locale in locales"><a @click.prevent="setLocale(locale.key)" href>{{ locale.text }}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">

      <transition name="fade-horizontal" mode="out-in"
                  enter-active-class="animated fadeInLeft"
                  leave-active-class="animated fadeOutRight">
        <router-view class="row"></router-view>
      </transition>

    </div>

    <toast></toast>
  </div>
</template>

<script>
    import Vue from 'vue'
    import Toast from './helpers/Toast.vue'
    import auth from './../api/auth'
    import * as types from './../store/mutations'
    import * as lang from './../lang'

    export default {

        mounted() {
            auth.checkAuth();
        },

        data() {

            return {
                locales: lang.locales
            }

        },

        computed: {

            user() {
                return this.$store.state.auth.user;
            },

            user_name() {
                return this.$store.state.auth.user.name;
            },

        },

        methods: {

            logout() {
                this.$store.commit(types.AUTH_LOGOUT);
                this.$store.commit(types.TOAST_ADD, {message: this.$t('app.logout_toast_msg')});
            },

            setLocale(locale) {
                lang.setLocale(locale);
            },

            //toast() {
            //    this.$store.commit(types.TOAST_ADD, {message: 'Hello World!'});
            //}

        },

        components: {
            toast: Toast
        },

    }
</script>