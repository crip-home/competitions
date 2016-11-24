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
                <li>
                  <router-link :to="{ name: 'login' }">Login</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'signup' }">Sign Up</router-link>
                </li>
                <li>
                  <a href="/logout" @click="logout">Logout</a>

                  <form id="logout-form" action="/logout" method="POST">
                    <input type="hidden" name="_token" v-model="csrf_token">
                  </form>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {

        mounted() {
            console.log('Component ready.')
        },

        computed: {

            app_name() {
                return $('title').text();
            },

            user_name() {
                return $('meta[name="user-name"]').attr('content');
            },

            csrf_token() {
                return $('meta[name="csrf-token"]').attr('content');
            }

        },

        methods: {

            logout(e) {
                e.preventDefault();
                $('#logout-form').submit();
            },

        },

    }
</script>