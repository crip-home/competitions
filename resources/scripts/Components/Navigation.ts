import Vue from 'vue'
import middleware from '@/Modules/Auth/MiddlewareService'
import {AuthService} from '@/Modules/Auth/AuthService'
import * as roles from '@/Modules/Auth/Roles'
import router from '@/Router'
import * as routes from '@/Router/Routes'
import {locales as AppLocales, SetLocale, Locale, i18n} from '@/Lang'
import {NavGroup, NavItem, NavItemType} from './Nav'

import Navbar from './Nav/Navbar.vue'
import NavbarItems from './Nav/NavbarItems.vue'
import NavbarGroup from './Nav/NavbarGroup.vue'
import NavbarItem from './Nav/NavbarItem.vue'

Vue.component('navbar', Navbar)
Vue.component('navbar-items', NavbarItems)
Vue.component('navbar-group', NavbarGroup)
Vue.component('navbar-item', NavbarItem)

const canManage = () => middleware.hasAnyRole(roles.all)

export const left = (): NavGroup[] => {
  if (!middleware.isAuthenticated() || !canManage()) {
    // Left menu is available only for users with access to manage
    return []
  }

  const nav = new NavGroup('Manage')
  const canManagePosts = middleware.hasAnyRole(roles.posts)
  const canManageCM = middleware.hasAnyRole(roles.competitions)
  const divider = new NavItem({divider: true})

  if (canManagePosts) {
    if (middleware.hasRole(roles.CREATE_POST)) {
      nav.create({text: 'Create post', route: routes.createPost})
    }

    nav.create({text: 'Posts', route: routes.listPosts})
    nav.add(divider)
  }

  if (middleware.hasRole(roles.CREATE_TEAMS)) {
    nav.create({text: 'Create team', route: routes.createTeam})
    nav.create({text: 'Teams', route: routes.listTeams})
    nav.add(divider)
  }

  if (canManageCM) {
    if (middleware.hasRole(roles.CREATE_COMPETITIONS)) {
      nav.create({text: 'Create competition', route: routes.createCompetition})
    }

    nav.create({text: 'Competition', route: routes.listCompetitions})
    nav.add(divider)
  }

  // delete last divider from manage nav
  nav.items.splice(-1, 1)

  return [nav]
}

export const right = () => {
  const nav: NavItemType[] = [localesNav()]

  if (!middleware.isAuthenticated()) {
    nav.push(new NavItem({text: t('nav.login'), route: routes.login}))
    nav.push(new NavItem({text: t('nav.signup'), route: routes.signup}))
    return nav
  }

  nav.push(new NavGroup(
    AuthService.user().name,
    [
      // TODO: add messages menu item
      new NavItem({text: t('nav.profile'), route: routes.profile}),
      new NavItem({text: t('nav.logout'), click: logout})
    ]
  ))

  return nav
}

function localesNav() {
  const locales = new NavGroup(t('nav.locale'))
  Object.keys(AppLocales).forEach(key => {
    const locale: Locale = AppLocales[key]
    locales.create({
      text: locale.text,
      click: () => SetLocale(locale.key),
      isActive: t('nav.locale') == locale.text
    })
  })

  return locales
}

function t(key: string): string {
  return i18n.t(key) as string
}

function logout() {
  AuthService.logout()
  router.push({...routes.home, params: {message: 'logout'}})
}