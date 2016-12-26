import * as routes from './../routes'
import * as roles from './../../api/auth/roles'

import ChildHolder from './../../components/ChildHolder.vue'
import CreateEditTeam from './../../components/teams/admin/CreateEditTeam.vue'
import ListTeams from './../../components/teams/admin/ListTeams.vue'

const meta = {requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS]};
export default {
    path: '/teams', component: ChildHolder, children: [
        {path: 'admin/create', name: routes.create_team.name, component: CreateEditTeam, meta},
        {path: 'admin/list/:page?', name: routes.list_teams.name, component: ListTeams, meta},
        {path: 'admin/edit/:id', name: routes.edit_team.name, component: CreateEditTeam, meta},
    ]
};