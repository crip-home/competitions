import * as routes from '../../router/routes'
import * as roles from '../../api/roles'
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
      ...routes.createCompetitionRoute,
      component: CreateCompetition,
      meta: {requiresAuth, requiresRoles: createRole}
    },
    {
      path: 'manage/all/:page?',
      ...routes.listCompetitionsRoute,
      component: ListCompetitions,
      meta: {requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole]}
    },
    {
      path: 'manage/:id',
      ...routes.editCompetitionRoute,
      component: CreateCompetition,
      meta: {requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole]}
    }
  ]
}
