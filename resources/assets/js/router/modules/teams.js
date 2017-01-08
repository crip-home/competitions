import {create_team, list_teams, edit_team, list_team_members} from './../routes'
import * as roles from './../../api/auth/roles'

import ChildHolder from './../../components/ChildHolder.vue'
import CreateEditTeam from './../../components/teams/admin/CreateEditTeam.vue'
import ListTeams from './../../components/teams/admin/ListTeams.vue'
import ListTeamMembers from './../../components/teams/admin/ListMembers.vue'

const meta = {requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS]};
export default {
    path: '/teams', component: ChildHolder, children: [
        {path: 'admin/create', name: create_team.name, component: CreateEditTeam, meta},
        {path: 'admin/list/:page?', name: list_teams.name, component: ListTeams, meta},
        {path: 'admin/edit/:id', name: edit_team.name, component: CreateEditTeam, meta},
        {path: 'admin/:team/members/:page?', name: list_team_members.name, component: ListTeamMembers, meta}
    ]
};