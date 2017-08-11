import * as routes from '../routes'
import * as roles from '../../api/auth/roles'
import ChildHolder from '../../components/ChildHolder.vue'
import CreateCompetition from '../../components/competitions/admin/CreateCompetition.vue'
import ListCompetitions from '../../components/competitions/admin/ListCompetitions.vue'

let requiresAuth = {requiresAuth: true}
let createRole = [roles.CREATE_COMPETITIONS]
let listRole = [roles.EDIT_COMPETITIONS]

export default {
  path: '/competitions',
  component: ChildHolder,
  children: [
    {
      path: 'admin/create',
      ...routes.createCompetitionRoute,
      component: CreateCompetition,
      meta: {requiresAuth, requiresRoles: createRole}
    },
    {
      path: 'admin/list/:page?',
      ...routes.listCompetitionsRoute,
      component: ListCompetitions,
      meta: {requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole]}
    }
  ]
}
