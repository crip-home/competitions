<template>
  <grid id="list-teams" :paging="paging">
    <span slot="title">Manage teams</span>
    <panel-action slot="actions" :to="createRoute">Create New Team</panel-action>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Short</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="team in paging.items">
        <tr @click="paging.select(team)" :class="paging.rowClasses(team)">
          <td>{{ team.name }}&nbsp;
            <router-link :to="team.editRoute" class="label label-info actions">
              Edit
            </router-link>
            &nbsp;
            <router-link
                :to="team.membersListRoute" class="label label-info actions">
              Members
            </router-link>
          </td>
          <td>{{ team.short }}</td>
        </tr>
      </template>
      </tbody>
    </table>

  </grid>
</template>

<script>
  import { manageTeams } from './api'
  import { listTeams, createTeam } from '../../router/routes'
  import Paging from '../helpers/grid/Paging'

  export default {
    mounted () {
      this.fetchPage(this.$route.params.page || 1)
    },

    data () {
      return {
        paging: new Paging({route: listTeams}),
        createRoute: createTeam
      }
    },

    methods: {
      fetchPage (page = 1) {
        this.paging.loading = true
        manageTeams.get(page, this.paging.perPage)
          .then(data => {
            console.log(data)
            return data
          })
          .then(data => { this.paging.update(data) })
      }
    },

    watch: {
      '$route' (to) {
        this.fetchPage(to.params.page || 1)
      }
    }
  }
</script>