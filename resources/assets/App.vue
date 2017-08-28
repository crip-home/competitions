<template>
  <div id="app-view">
    <navbar :left-menu="leftNavbarItems" :right-menu="rightNavbarItems">
      <router-link :to="routes.home" class="navbar-brand">
        {{ $t('app.title') }}
      </router-link>
    </navbar>

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

<script>
  import * as lang from './lang/index'
  import * as roles from './api/roles'
  import * as routes from './router/routes'
  import auth from './modules/auth/api'
  import Navbar from './components/bootstrap/nav/Navbar.vue'
  import { mapGetters } from 'vuex'
  import {
    NavbarItem,
    NavbarGroup,
    NavbarItems
  } from './components/bootstrap/nav/index'

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
      ...mapGetters(['isAuth', 'authUser']),

      leftNavbarItems () {
        let user = auth.middleware
        let canManage = user.hasAnyRole([
          roles.CREATE_POST,
          roles.MANAGE_POSTS,
          roles.CREATE_TEAMS,
          roles.CREATE_COMPETITIONS,
          roles.EDIT_COMPETITIONS
        ])

        // if user is not authenticated, this menu is unavailable for him
        if (!this.isAuth || !canManage) {
          return []
        }

        let manageNav = new NavbarGroup('Manage')
        let canManagePosts = user.hasAnyRole([roles.CREATE_POST, roles.MANAGE_POSTS])
        let canManageCompetitions = user.hasAnyRole([roles.CREATE_COMPETITIONS, roles.EDIT_COMPETITIONS])
        let divider = new NavbarItem(true)

        if (canManagePosts) {
          manageNav.add('Posts')

          if (user.hasRole(roles.CREATE_POST)) {
            manageNav.add('Create', routes.createPost)
          }

          manageNav.add('List', routes.listPosts)
          manageNav.add(divider)
        }

        if (user.hasRole(roles.CREATE_TEAMS)) {
          manageNav.add('Teams')
          manageNav.add('Create', routes.createTeam)
          manageNav.add('List', routes.listTeams)
          manageNav.add(divider)
        }

        if (canManageCompetitions) {
          manageNav.add('Competitions')

          if (user.hasRole(roles.CREATE_COMPETITIONS)) {
            manageNav.add('Create', routes.createCompetitionRoute)
          }

          manageNav.add('List', routes.listCompetitionsRoute)
          manageNav.add(divider)
        }

        // delete last divider from manage nav
        manageNav.items.splice(-1, 1)

        return [manageNav]
      },

      rightNavbarItems () {
        let user = this.authUser
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

        if (!this.isAuth) {
          nav.add(new NavbarItem(this.$t('app.login'), routes.login))
          nav.add(new NavbarItem(this.$t('app.signup'), routes.signup))
        } else {
          nav.add(new NavbarGroup(
            user.name,
            new NavbarItems(
              new NavbarItem(this.$t('app.profile'), routes.profileRoute),
              new NavbarItem(
                this.$t('app.messages', {count: this.$store.state.messages.unread}),
                {...routes.messagesRoute, params: {type: 'inbox'}}
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
        this.$store.commit('logout')
        this.$toasted.success(this.$t('app.logout_toast_msg'))
        // Redirect user to homepage after logout
        this.$router.push(routes.home)
      },

      /**
       * Force vuex store to update message count
       * @param store
       */
      checkMessageCount (store) {
        store.dispatch('checkMessageCount')
      }
    },

    watch: {
      isAuth (val) {
        if (val) {
          // clear interval if it is already set
          clearInterval(this.messageTimer)
          // create initial message check
          this.checkMessageCount(this.$store)
          // Check message count each 60 seconds to be up to date for user
          this.messageTimer = setInterval(this.checkMessageCount, 60000, this.$store)
        } else {
          // clear interval if user log outs
          clearInterval(this.messageTimer)
        }
      }
    },

    components: {
      [Navbar.name]: Navbar
    }
  }
</script>

<style lang="scss">
  @import "../sass/app";

  .router-link-active {
    font-weight: bolder !important;
  }
</style>