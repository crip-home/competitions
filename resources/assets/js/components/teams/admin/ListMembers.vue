<template>
  <grid id="list-team-members" :paging="paging">
    <span slot="title">Manage members</span>
    <span slot="actions" v-if="team.id">
      <panel-action :to="team.editRoute()">Edit team</panel-action>
      <panel-action :to="team.newMemberRoute()">Create New Member</panel-action>
    </span>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="member in paging.items">
        <tr @click="paging.select(member)" :class="paging.rowClasses(member)">
          <td>{{ member.id }}</td>
          <td>{{ member.name }}&nbsp;
            <router-link :to="member.editRoute()"
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
    import {teams, members} from './../../../api/teams/admin'
    import {list_team_members} from './../../../router/routes'
    import Paging from './../../helpers/grid/Paging'

    export default {

        mounted() {
            this.fetchData(this.$route.params.team);
        },

        data() {
            return {
                paging: new Paging(list_team_members),
                team: {}
            }
        },

        methods: {

            /**
             * Fetch team from the server
             * @param {Number} team_id
             */
            fetchData(team_id) {
                this.paging.loading = true;
                teams.find(team_id)
                    .then(team => {
                        this.team = team;
                        this.fetchPage(team.id, this.$route.params.page);
                    });
            },

            /**
             * Fetch paging data from server
             * @param {Number}  team_id
             * @param {Number} [page]
             */
            fetchPage(team_id, page = 1) {
                this.paging.loading = true;
                members.get(page, this.per_page || 15, {team_id})
                    .then(data => this.paging.update(data));
            }
        },

        watch: {
            '$route'({params}) {
                this.fetchPage(this.team.id, params.page || 1);
            }
        }
    }
</script>