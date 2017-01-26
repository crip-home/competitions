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
  import Toast                                    from './helpers/Toast.vue'
  import Navbar                                   from './helpers/bootstrap/nav/Navbar.vue'
  import { NavbarItem, NavbarGroup, NavbarItems } from './helpers/bootstrap/nav'
  import auth                                     from './../api/auth'
  import * as roles                               from './../api/auth/roles'
  import * as types                               from '../store/types'
  import * as lang                                from './../lang'
  import * as routes                              from './../router/routes'

  export default {
    mounted () {
      auth.checkAuth()
    },

    data () {
      return {
        locales: lang.locales,
        messageTimer: null,
        routes
      }
    },

    computed: {
      user () {
        return this.$store.state.auth.user
      },

      isAuthenticated () {
        return auth.middleware.isAuthenticated()
      },

      leftNavbarItems () {
        let user = auth.middleware
        let canManage = user.hasAnyRole([
          roles.CREATE_POST,
          roles.MANAGE_POSTS,
          roles.CREATE_TEAMS
        ])

        // if user is not authenticated, this menu is unavailable for him
        if (!this.isAuthenticated || !canManage) {
          return []
        }

        let manageNav = new NavbarGroup('Manage')
        let canManagePosts = user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS])
        let divider = new NavbarItem(true)

        if (canManagePosts) {
          manageNav.add('Posts')
        }

        if (user.hasRole(roles.CREATE_POST)) {
          manageNav.add('Create', routes.createPost)
        }

        if (canManagePosts) {
          manageNav.add('List', routes.listPosts)
          manageNav.add(divider)
        }

        if (user.hasRole(roles.CREATE_TEAMS)) {
          manageNav.add('Teams')
          manageNav.add('Create', routes.createTeam)
          manageNav.add('List', routes.listTeams)
          manageNav.add(divider)
        }

        // delete last divider from manage nav
        manageNav.items.splice(-1, 1)

        return [manageNav]
      },

      rightNavbarItems () {
        let user = this.user
        let nav = new NavbarItems()
        let locales = new NavbarGroup(this.$t('locale'))

        Object.keys(lang.locales)
          .forEach(key => {
            const locale = lang.locales[key]
            locales.add(
              locale.text,
              _ => lang.setLocale(locale.key),
              this.$t('locale') === locale.text
            )
          })

        if (!this.isAuthenticated) {
          nav.add(new NavbarItem(this.$t('app.login'), routes.login))
          nav.add(new NavbarItem(this.$t('app.signup'), routes.signup))
        } else {
          nav.add(new NavbarGroup(
            user.name,
            new NavbarItems(
              new NavbarItem(
                this.$t('app.messages', {count: this.$store.state.messages.unread}),
                routes.messages
              ),
              new NavbarItem(this.$t('app.logout'), this.logout)
            )
          ))
        }

        nav.add(locales)

        return nav
      }
    },

    methods: {
      logout () {
        this.$store.commit(types.AUTH_LOGOUT)
        this.$store.commit(types.TOAST_ADD, {message: this.$t('app.logout_toast_msg')})
        // Redirect user to homepage after logout
        this.$router.push(routes.home)
      },

      /**
       * Force vuex store to update message count
       * @param store
       */
      checkMessageCount (store) {
        store.dispatch(types.MESSAGES_CHECK)
      }
      // toast() {
      //    this.$store.commit(types.TOAST_ADD, {message: 'Hello World!'});
      // }
    },

    watch: {
      isAuthenticated (val) {
        if (val) {
          // clear interval if it is already set
          clearInterval(this.messageTimer)
          // create initial message check
          this.checkMessageCount(this.$store)
          // Check message count each 15 seconds to be up to date for user
          this.messageTimer = setInterval(this.checkMessageCount, 15000, this.$store)
        } else {
          // clear interval if user log outs
          clearInterval(this.messageTimer)
        }
      }
    },

    components: {
      toast: Toast,
      [Navbar.name]: Navbar
    }
  }
</script>

<style lang="sass">
  @import "../../sass/app.scss";

  .router-link-active {
    font-weight: bolder !important;
  }
</style>