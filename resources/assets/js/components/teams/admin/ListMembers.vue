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
    import {teams, members} from './../../../api/teams/admin'
    import {list_team_members} from './../../../router/routes'

    export default {

        mounted() {
            this.fetchData(this.$route.params.team);
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

            fetchData(team_id, page = 1) {
                teams.find(team_id)
                    .then(team => {
                        this.team = team;
                    });

                this.isDataLoading = true;

                members.get(page, this.per_page || 15, {team_id})
                    .then(data => {
                        this.current_page = data.current_page;
                        this.last_page = data.last_page;
                        this.per_page = data.per_page;
                        this.members = data.items;
                        this.isDataLoading = false;

                        // this will allow return to page where we last time left
                        list_team_members.params ?
                            (list_team_members.params.page = this.current_page) :
                            (list_team_members.params = {page: this.current_page});
                    });
            },

        }
    }
</script>