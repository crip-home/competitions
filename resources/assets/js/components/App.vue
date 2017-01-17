<template>
  <div id="app-view">
    <navbar :left-menu="leftNavbarItems" :right-menu="rightNavbarItems">
      <router-link :to="routes.home" class="navbar-brand">{{ $t('app.title') }}</router-link>
    </navbar>

    <!--
    <ul class="nav navbar-nav">
            <li class="dropdown" v-if="userCan('manage')">
              <a href class="dropdown-toggle" data-toggle="dropdown">
                Manage <span class="caret"></span>
              </a>

              <ul class="dropdown-menu">

                <li class="dropdown-header" v-if="userCan('manage_posts')">Posts</li>
                <li v-if="userCan('create_posts')">
                  <router-link :to="routes.create_post">Create</router-link>
                </li>
                <li v-if="userCan('list_posts')">
                  <router-link :to="routes.list_posts">List</router-link>
                </li>
                <li class="divider" v-if="userCan('manage_posts')"></li>

                <li class="dropdown-header" v-if="userCan('manage_teams')">Teams</li>
                <li v-if="userCan('manage_teams')">
                  <router-link :to="routes.create_team">Create</router-link>
                </li>
                <li v-if="userCan('manage_teams')">
                  <router-link :to="routes.list_teams">List</router-link>
                </li>
                <li class="divider" v-if="userCan('manage_teams')"></li>

              </ul>
            </li>
          </ul>
    -->

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
    import Navbar from './helpers/bootstrap/nav/Navbar.vue'
    import auth from './../api/auth'
    import * as roles from './../api/auth/roles'
    import * as types from '../store/types'
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

            leftNavbarItems() {
                return [];
            },

            rightNavbarItems() {
                let user = this.$store.state.auth.user;
                let nav = [];
                let locales = [];

                Object.keys(lang.locales)
                    .forEach(locale => locales.push({
                        click: () => lang.setLocale(lang.locales[locale].key),
                        text: lang.locales[locale].text
                    }));

                if (!user.authenticated) {
                    nav.push({text: this.$t('app.login'), route: routes.login});
                    nav.push({text: this.$t('app.signup'), route: routes.signup});
                } else {
                    nav.push({
                        parent: {text: user.name},
                        items: [
                            {text: this.$t('app.logout'), click: this.logout}
                        ]
                    });
                }

                nav.push({
                    parent: {text: this.$t('locale')},
                    items: locales
                });

                return nav;
            }

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

                if (action === 'manage')
                    return user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS, roles.CREATE_TEAMS]);


                if (action === 'manage_posts')
                    return user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS]);
                if (action === 'create_posts')
                    return user.hasRole(roles.CREATE_POST);
                if (action === 'list_posts')
                    return user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS]);

                if (action === 'manage_teams')
                    return user.hasRole(roles.CREATE_TEAMS);

                return false;
            },

            //toast() {
            //    this.$store.commit(types.TOAST_ADD, {message: 'Hello World!'});
            //}

        },

        components: {
            toast: Toast,
            [Navbar.name]: Navbar
        },

    }
</script>