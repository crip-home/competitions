import {
  listTeams, createTeam, editTeam,
  listTeamMembers, createTeamMember, editTeamMember,
  teamInvitationRoute
} from '../routes'
import * as roles from '../../api/auth/roles'

import ChildHolder from '../../components/ChildHolder.vue'
import CreateEditTeam from '../../components/teams/admin/CreateEditTeam.vue'
import ListTeams from '../../components/teams/admin/ListTeams.vue'
import ListTeamMembers from '../../components/teams/admin/ListMembers.vue'
import CreateEditTeamMember from '../../components/teams/admin/CreateEditMember.vue'
import TeamMemberInvitation from '../../components/teams/TeamMemberInvitation.vue'

const requiresAuth = true
const meta = {requiresAuth, requiresRoles: [roles.CREATE_TEAMS]}
export default {
  path: '/teams',
  component: ChildHolder,
  children: [
    {path: 'admin/create', ...createTeam, component: CreateEditTeam, meta},
    {path: 'admin/edit/:id', ...editTeam, component: CreateEditTeam, meta},
    {path: 'admin/list/:page?', ...listTeams, component: ListTeams, meta},
    {path: 'admin/:team/members/create', ...createTeamMember, component: CreateEditTeamMember, meta},
    {path: 'admin/:team/members/edit/:id', ...editTeamMember, component: CreateEditTeamMember, meta},
    {path: 'admin/:team/members/:page?', ...listTeamMembers, component: ListTeamMembers, meta},
    {path: 'invitations/:type/:id', ...teamInvitationRoute, component: TeamMemberInvitation, meta: {requiresAuth}}
  ]
}
