<template>
  <div id="app-view">
    <navbar :left-menu="leftNavbarItems" :right-menu="rightNavbarItems">
      <router-link :to="routes.home" class="navbar-brand">{{ $t('app.title') }}</router-link>
    </navbar>

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
    import {NavbarItem, NavbarGroup, NavbarItems} from './helpers/bootstrap/nav'
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
                let user = auth.middleware;
                let can_manage = user.hasAnyRole([
                    roles.CREATE_POST,
                    roles.MANAGE_POSTS,
                    roles.CREATE_TEAMS
                ]);

                // if user is not authenticated, this menu is unavailable for him
                if (!user.isAuthenticated() || !can_manage) {
                    return [];
                }

                let manageNav = new NavbarGroup('Manage');
                let can_manage_posts = user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS]);
                let divider = new NavbarItem(true);

                if (can_manage_posts) {
                    // TODO: add dropdown header class="dropdown-header" Posts
                    manageNav.add('Posts');
                }

                if (user.hasRole(roles.CREATE_POST)) {
                    manageNav.add('Create', routes.create_post);
                }

                if (can_manage_posts) {
                    manageNav.add('List', routes.list_posts);
                    manageNav.add(divider);
                }

                if (user.hasRole(roles.CREATE_TEAMS)) {
                    manageNav.add('Teams');
                    manageNav.add('Create', routes.create_team);
                    manageNav.add('List', routes.list_teams);
                    manageNav.add(divider);
                }

                // delete last divider from manage nav
                manageNav.items.splice(-1, 1);

                return [manageNav];
            },

            rightNavbarItems() {
                let user = this.$store.state.auth.user;
                let nav = new NavbarItems();
                let locales = new NavbarGroup(this.$t('locale'));

                Object.keys(lang.locales)
                    .forEach(locale => locales.add(
                        lang.locales[locale].text,
                        _ => lang.setLocale(lang.locales[locale].key)
                    ));

                if (!user.authenticated) {
                    nav.add(new NavbarItem(this.$t('app.login'), routes.login));
                    nav.add(new NavbarItem(this.$t('app.signup'), routes.signup));
                } else {
                    nav.add(new NavbarGroup(
                        user.name,
                        new NavbarItems(
                            new NavbarItem(this.$t('app.logout'), this.logout)
                        )
                    ));
                }

                nav.add(locales);

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