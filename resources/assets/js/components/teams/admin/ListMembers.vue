<template>
  <panel id="list-team-members" class="col-md-12" v-loading="isDataLoading">

    <span slot="title">Manage members</span>
    <span slot="actions" v-if="team.id">
      <router-link :to="team.editRoute()" class="pull-right">Back to team</router-link>
    </span>


    <paging :current-page="current_page"
            :per-page="per_page"
            :last-page="last_page"
            :route="pagingRoute"></paging>

  </panel>
</template>

<script>
    import teams from './../../../api/teams/admin'
    import {list_team_members} from './../../../router/routes'

    export default {

        mounted() {
            this.fetchTeam(this.$route.params.team);
        },

        data() {
            return {
                isDataLoading: false,
                current_page: 0,
                last_page: 0,
                per_page: 0,
                members: [],
                team: {},
                pagingRoute: list_team_members
            }
        },

        methods: {

            fetchTeam(teamId) {
                teams.find(teamId)
                    .then(team => {
                        this.team = team;
                    });
            },

        }
    }
</script>