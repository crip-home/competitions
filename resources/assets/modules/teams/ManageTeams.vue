<template>
  <grid id="list-teams" :paging="paging">
    <span slot="title">Manage teams</span>
    <panel-action slot="actions" :to="createRoute">Create New Team
    </panel-action>

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
  import Paging from '../../components/grid/Paging'

  export default {
    name: 'manage-teams',

    data () {
      return {
        paging: new Paging(this, {route: listTeams}),
        createRoute: createTeam
      }
    },

    created () {
      this.$log.component(this)
      this.paging.init(() => this.fetchPage())
    },

    methods: {
      fetchPage () {
        this.paging.loading = true
        manageTeams.get(this.paging)
          .then(data => { this.paging.update(data) })
      }
    }
  }
</script>