<template>
  <grid id="list-team-members" :paging="paging">
    <span slot="title">Manage members</span>
    <span slot="actions" v-if="team.id">
      <panel-action :to="team.editRoute">Edit team</panel-action>
      <panel-action :to="team.newMemberRoute">Create New Member</panel-action>
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
        <tr @click="paging.select(member)" :class="paging.rowClasses(member, {danger: !member.isActive})">
          <td>{{ member.id }}</td>
          <td>{{ member.name }}&nbsp;
            <span v-if="!member.isActive" class="actions">(member is not active)</span>
            <router-link :to="member.editRoute"
                         class="label label-info actions">Edit
            </router-link>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </grid>
</template>

<script>
  import { manageTeams, manageMembers } from './api'
  import { listTeamMembers } from '../../router/routes'
  import Paging from '../../components/helpers/grid/Paging'

  export default {
    mounted () {
      this.fetchData(this.$route.params.team)
    },

    data () {
      return {
        paging: new Paging({route: listTeamMembers}),
        team: {}
      }
    },

    methods: {
      /**
       * Fetch team from the server
       * @param {Number} teamId
       */
      fetchData (teamId) {
        this.paging.loading = true
        manageTeams.find(teamId)
          .then(team => {
            this.team = team
            this.fetchPage(team.id, this.$route.params.page)
          })
      },

      /**
       * Fetch paging data from server
       * @param {Number}  teamId
       * @param {Number} [page]
       */
      fetchPage (teamId, page = 1) {
        this.paging.loading = true
        manageMembers.get(page, this.paging.perPage || 15, {teamId})
          .then(data => this.paging.update(data))
      }
    },

    watch: {
      '$route' ({params}) {
        this.fetchPage(this.team.id, params.page || 1)
      }
    }
  }
</script>