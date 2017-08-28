<template>
  <grid id="list-team-members" :paging="paging">
    <span slot="title">Manage members</span>
    <span slot="actions" v-if="team.id">
      <panel-action :to="team.editRoute" title="Edit team settings">
        Edit team
      </panel-action>
      <panel-action :to="team.newMemberRoute" title="Create new team member">
        Create New Member
      </panel-action>
    </span>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
      </tr>
      </thead>

      <tbody>
      <template v-for="member in paging.items">
        <tr
            @click="paging.select(member)"
            :class="paging.rowClasses(member, {danger: !member.isActive})"
        >
          <td>{{ member.id }}</td>
          <td>
            {{ member.name }}
            <span v-if="!member.isActive" class="actions">
              (member is not active)
            </span>
            &nbsp;
            <router-link
                :to="member.editRoute" class="label label-info actions"
            >
              Edit
            </router-link>
            &nbsp;
            <router-link
                :to="member.userProfileRoute" class="label label-info actions"
                v-if="member.isLinkedToUser"
            >
              Profile
            </router-link>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

  </grid>
</template>

<script>
  import members from './api-members-manage'
  import Paging from '../../components/grid/Paging'
  import teams from './api-teams-manage'
  import { listTeamMembers } from '../../router/routes'

  export default {
    name: 'manage-members',

    data () {
      return {
        paging: new Paging(this, {route: listTeamMembers}),
        team: {}
      }
    },

    created () {
      this.$log.component(this)
      this.fetchTeamData(this.teamId)
      this.paging.init(page => this.fetchPage(this.teamId, page), this.page)
    },

    computed: {
      teamId () { return this.$route.params.team },
      page () { return this.$route.params.page || 1 }
    },

    methods: {
      /**
       * Fetch team from the server API.
       * @param  {number} teamId
       * @return {Promise.<void>}
       */
      async fetchTeamData (teamId) {
        this.paging.loading = true
        this.team = await teams.find(teamId)
      },

      /**
       * Fetch paging data from server API.
       * @param  {number} teamId
       * @param  {number} [page]
       * @return {Promise.<void>}
       */
      async fetchPage (teamId, page = 1) {
        this.paging.loading = true
        const perPage = this.paging.perPage || 15
        const response = await members.get(page, perPage, {teamId})
        this.paging.update(response)
      }
    }
  }
</script>