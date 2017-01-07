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
          <router-link :to="team.editRoute()" class="label label-info actions">Edit</router-link>
          &nbsp;
          <router-link :to="team.membersListRoute()" class="label label-info actions">Members</router-link>
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
                        this.current_page = data.current_page;
                        this.last_page = data.last_page;
                        this.per_page = data.per_page;
                        this.teams = data.items;
                        this.isDataLoading = false;

                        // this will allow return to page where we last time left
                        routes.list_teams.params ?
                            (routes.list_teams.params.page = this.current_page) :
                            (routes.list_teams.params = {page: this.current_page});
                    });
            },

            /**
             * @param {Team} team
             */
            select(team) {
                this.selected = team;
            },

        }

    }
</script>