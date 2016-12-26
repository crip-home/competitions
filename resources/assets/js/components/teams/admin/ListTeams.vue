<template>
  <panel id="list-teams" class="col-md-12" v-load="isDataLoading">
    <span slot="title">Manage teams <router-link :to="createRoute" class="pull-right">Create New Team</router-link></span>

    <table slot="pre" class="table table-striped table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Short</th>
      </tr>
      </thead>
      <tbody>
      <router-link tag="tr" v-for="team in teams" class="pointer" :to="teamRoute(team)">
        <td>{{ team.id }}</td>
        <td>{{ team.name }}</td>
        <td>{{ team.short }}</td>
      </router-link>
      </tbody>
    </table>

    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :route="pagingRoute"></paging>

  </panel>
</template>

<script>
    import Panel from './../../helpers/Panel.vue'
    import Paging from './../../helpers/Paging.vue'
    import Loading from '../../../directives/loading'
    import teams from './../../../api/teams/admin'
    import * as routes from './../../../router/routes'

    export default {

        mounted() {
            this.fetchPage(this.$route.params.page || 1);
        },

        data() {
            return {
                teams: [],
                current_page: 0,
                last_page: 0,
                per_page: 0,
                isDataLoading: false,
                pagingRoute: routes.list_teams,
                createRoute: routes.create_team,
            };
        },

        methods: {

            fetchPage(page = 1) {
                this.isDataLoading = true;
                teams.get(page, this.per_page)
                    .then(data => {
                        this.teams = [];
                        this.current_page = parseInt(data.current_page);
                        this.last_page = parseInt(data.last_page);
                        this.per_page = parseInt(data.per_page);

                        data.data.forEach(team => this.teams.push(team));
                        this.isDataLoading = false;
                    });
            },

            teamRoute(team) {
                return {
                    name: routes.edit_team.name,
                    params: {
                        id: team.id
                    }
                };
            },

        },

        components: {
            panel: Panel,
            paging: Paging
        },

        directives: {
            load: Loading,
        },

    }
</script>