import * as routes from '../../router/routes'
import * as roles from '../../api/auth/roles'
import Wrapper from '../../Wrapper.vue'
import CreateCompetition from './CreateCompetition.vue'
import ListCompetitions from './ManageCompetitionList.vue'

let requiresAuth = {requiresAuth: true}
let createRole = [roles.CREATE_COMPETITIONS]
let listRole = [roles.EDIT_COMPETITIONS]

export default {
  path: '/competitions',
  component: Wrapper,
  children: [
    {
      path: 'admin/create',
      name: routes.createCompetitionRoute.name,
      component: CreateCompetition,
      meta: {requiresAuth, requiresRoles: createRole}
    },
    {
      path: 'admin/list/:page?',
      name: routes.listCompetitionsRoute.name,
      component: ListCompetitions,
      meta: {requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole]}
    }
  ]
}
