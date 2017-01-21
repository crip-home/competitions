import {
    list_teams, create_team, edit_team,
    list_team_members, create_team_member, edit_team_member
} from './../routes'
import * as roles from './../../api/auth/roles'

import ChildHolder from './../../components/ChildHolder.vue'
import CreateEditTeam from './../../components/teams/admin/CreateEditTeam.vue'
import ListTeams from './../../components/teams/admin/ListTeams.vue'
import ListTeamMembers from './../../components/teams/admin/ListMembers.vue'
import CreateEditTeamMember from './../../components/teams/admin/CreateEditMember.vue'

const meta = {requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS]};
export default {
    path: '/teams', component: ChildHolder, children: [
        {path: 'admin/create', ...create_team, component: CreateEditTeam, meta},
        {path: 'admin/edit/:id', ...edit_team, component: CreateEditTeam, meta},
        {path: 'admin/list/:page?', ...list_teams, component: ListTeams, meta},
        {path: 'admin/:team/members/create', ...create_team_member, component: CreateEditTeamMember, meta},
        {path: 'admin/:team/members/edit/:id', ...edit_team_member, component: CreateEditTeamMember, meta},
        {path: 'admin/:team/members/:page?', ...list_team_members, component: ListTeamMembers, meta},
    ]
};