import * as routes from '../../router/routes'
import * as roles from '../../api/auth/roles'
import Wrapper from '../../Wrapper.vue'
import CreateCompetition from './ManageCompetition.vue'
import ListCompetitions from './ManageCompetitions.vue'

let requiresAuth = {requiresAuth: true}
let createRole = [roles.CREATE_COMPETITIONS]
let listRole = [roles.EDIT_COMPETITIONS]

export default {
  path: '/competitions',
  component: Wrapper,
  children: [
    {
      path: 'manage/new',
      name: routes.createCompetitionRoute.name,
      component: CreateCompetition,
      meta: {requiresAuth, requiresRoles: createRole}
    },
    {
      path: 'manage/all/:page?',
      name: routes.listCompetitionsRoute.name,
      component: ListCompetitions,
      meta: {requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole]}
    }
  ]
}
