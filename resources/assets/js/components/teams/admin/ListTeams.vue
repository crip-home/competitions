<template>
  <panel id="list-teams" class="col-md-12" v-loading="isDataLoading">
    <span slot="title">Manage teams</span>
    <router-link slot="actions" :to="createRoute" class="pull-right">Create New Team</router-link>

    <table slot="pre" class="table table-hover">
      <thead>
      <tr>
        <th>Name</th>
        <th>Short</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="team in teams" @click="select(team)" :class="{active: selected.id == team.id}"
          class="pointer with-hidden-actions">
        <td>{{ team.name }}
          <router-link :to="teamRoute(team)" class="label label-info actions">Edit</router-link>&nbsp;
          <router-link :to="teamMembersRoute(team)" class="label label-info actions">Members</router-link>
        </td>
        <td>{{ team.short }}</td>
      </tr>
      </tbody>
    </table>

    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :route="pagingRoute"></paging>

  </panel>
</template>

<script>
    import teams from './../../../api/teams/admin'
    import * as routes from './../../../router/routes'

    export default {

        mounted() {
            this.fetchPage(this.$route.params.page || 1);
        },

        data() {
            return {
                selected: {},
                teams: [],
                current_page: 0,
                last_page: 0,
                per_page: 0,
                isDataLoading: false,
                pagingRoute: routes.list_teams,
                createRoute: routes.create_team
            };
        },

        methods: {

            fetchPage(page = 1) {
                this.isDataLoading = true;
                teams.get(page, this.per_page)
                    .then(data => {
                        const page = parseInt(data.current_page);

                        this.teams = [];
                        this.current_page = page;
                        this.last_page = parseInt(data.last_page);
                        this.per_page = parseInt(data.per_page);

                        data.data.forEach(team => this.teams.push(team));
                        this.isDataLoading = false;

                        // this will allow return to page where we last time left
                        routes.list_teams.params ?
                            (routes.list_teams.params.page = this.current_page) :
                            (routes.list_teams.params = {page: this.current_page});
                    });
            },

            select(team) {
                this.selected = team;
            },

            teamRoute(team) {
                return {
                    name: routes.edit_team.name,
                    params: {
                        id: team.id
                    }
                };
            },

            teamMembersRoute(team) {
                return {
                    name: routes.list_team_members.name,
                    params: {
                        team: team.id
                    }
                }
            }

        }

    }
</script>