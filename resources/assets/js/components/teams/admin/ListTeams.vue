<template>
  <grid id="list-teams" :paging="paging">
    <span slot="title">Manage teams</span>
    <router-link slot="actions" :to="createRoute" class="pull-right">Create New Team</router-link>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Short</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="team in paging.items">
        <tr @click="paging.select(team)" :class="paging.rowClasses(team)">
          <td>{{ team.name }}
            &nbsp;
            <router-link :to="team.editRoute()" class="label label-info actions">Edit</router-link>
            &nbsp;
            <router-link :to="team.membersListRoute()" class="label label-info actions">Members</router-link>
          </td>
          <td>{{ team.short }}</td>
        </tr>
      </template>
      </tbody>
    </table>

  </grid>
</template>

<script>
    import {teams} from './../../../api/teams/admin'
    import {list_teams, create_team} from './../../../router/routes'
    import Paging from './../../helpers/grid/Paging'

    export default {

        mounted() {
            this.fetchPage(this.$route.params.page || 1);
        },

        data() {
            return {
                paging: new Paging(list_teams),
                createRoute: create_team
            };
        },

        methods: {

            fetchPage(page = 1) {
                this.paging.loading = true;
                teams.get(page, this.per_page)
                    .then(data => this.paging.update(data));
            },

        }

    }
</script>