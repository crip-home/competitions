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
          <router-link :to="routes.home" class="navbar-brand">{{ $t('app.title') }}</router-link>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
          <!-- Left Side Of Navbar -->
          <ul class="nav navbar-nav">
            <li class="dropdown" v-if="userCan('see_posts')">
              <a href class="dropdown-toggle" data-toggle="dropdown">
                Posts <span class="caret"></span>
              </a>

              <ul class="dropdown-menu">
                <li v-if="userCan('create_posts')">
                  <router-link :to="routes.create_post">Create</router-link>
                </li>
              </ul>
            </li>
          </ul>

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

              <ul class="dropdown-menu">
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
    import * as roles from './../api/auth/roles'
    import * as types from './../store/mutations'
    import * as lang from './../lang'
    import * as routes from './../router/routes'

    export default {

        mounted() {
            auth.checkAuth();
        },

        data() {

            return {
                locales: lang.locales,
                routes
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
                // Redirect user to homepage after logout
                this.$router.push(routes.home);
            },

            setLocale(locale) {
                lang.setLocale(locale);
            },

            userCan(action) {
                let user = auth.middleware;
                if (!user.isAuthenticated()) return false;

                if (action === 'see_posts')
                    return user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS]);


                if (action === 'create_posts')
                    return user.hasRole(roles.CREATE_POST);

                return false;
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