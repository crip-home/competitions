<template>
  <div id="app-view">
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">

          <!-- Collapsed Hamburger -->
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#app-navbar-collapse">
            <span class="sr-only">Toggle Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <!-- Branding Image -->
          <a class="navbar-brand" href="/">{{ app_name }}</a>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
          <!-- Left Side Of Navbar -->
          <ul class="nav navbar-nav">&nbsp;</ul>

          <!-- Right Side Of Navbar -->
          <ul class="nav navbar-nav navbar-right">

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                {{ user_name }} <span class="caret"></span>
              </a>

              <ul class="dropdown-menu" role="menu">
                <li>
                  <router-link :to="{ name: 'home' }">Home</router-link>
                </li>
                <li v-if="!user.authenticated">
                  <router-link :to="{ name: 'login' }">Login</router-link>
                </li>
                <li v-if="!user.authenticated">
                  <router-link :to="{ name: 'signup' }">Sign Up</router-link>
                </li>
                <li v-if="user.authenticated">
                  <a href="#" @click.prevent="logout">Logout</a>
                </li>
                <!--<li>
                  <a href="#" @click.prevent="toast">Toast</a>
                </li>-->
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view class="row"></router-view>
    </div>

    <toast></toast>
  </div>
</template>

<script>
    import Toast from './helpers/Toast.vue'
    import auth from './../api/auth'
    import * as types from './../store/mutations'

    export default {

        mounted() {
            auth.checkAuth();
        },

        computed: {

            user() {
                return this.$store.state.auth.user;
            },

            app_name() {
                return $('title').text();
            },

            user_name() {
                if (this.$store.state.auth.user.authenticated)
                    return this.$store.state.auth.user.name;

                return 'Actions'
            },

        },

        methods: {

            logout() {
                this.$store.commit(types.AUTH_LOGOUT);
                // TODO: show message about successful logout and redirect to home
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