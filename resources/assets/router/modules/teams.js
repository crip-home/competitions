import {
  listTeams, createTeam, editTeam,
  listTeamMembers, createTeamMember, editTeamMember,
  publicTeamDetailsRoute
} from '../routes'
import * as roles from '../../api/roles'

import Wrapper from '../../Wrapper.vue'
import CreateEditTeam from '../../modules/teams/ManageTeam.vue'
import ListTeams from '../../modules/teams/ManageTeams.vue'
import ListTeamMembers from '../../modules/teams/ManageMembers.vue'
import CreateEditTeamMember from '../../modules/teams/ManageMember.vue'
import TeamDetails from '../../modules/teams/Profile.vue'

const requiresAuth = true
const meta = {requiresAuth, requiresRoles: [roles.CREATE_TEAMS]}
export default {
  path: '/teams',
  component: Wrapper,
  children: [
    {path: 'admin/create', ...createTeam, component: CreateEditTeam, meta},
    {path: 'admin/edit/:id', ...editTeam, component: CreateEditTeam, meta},
    {path: 'admin/list/:page?', ...listTeams, component: ListTeams, meta},
    {path: 'admin/:team/members/create', ...createTeamMember, component: CreateEditTeamMember, meta},
    {path: 'admin/:team/members/edit/:id', ...editTeamMember, component: CreateEditTeamMember, meta},
    {path: 'admin/:team/members/:page?', ...listTeamMembers, component: ListTeamMembers, meta},
    {path: ':team/details/:tab/:page?', ...publicTeamDetailsRoute, component: TeamDetails}
  ]
}
