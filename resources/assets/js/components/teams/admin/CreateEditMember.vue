<template>
  <form-panel id="create-edit-team-member" :submit="saveMember" :title="title" class="col-md-12">
    <panel-action slot="actions" v-if="team.id" :to="team.membersListRoute()">Back to list</panel-action>

    <form-group id="name" label="Name" :errors="errors.name">
      <select2 id="name"
               v-model="form.name"
               :options="searchUser"></select2>
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

  </form-panel>
</template>

<script>
    import {teams, members} from './../../../api/teams/admin'
    import Select2Options from './../../helpers/forms/select2'

    export default {
        mounted() {
            this.fetchTeam(this.$route.params.team);
        },

        data() {
            return {
                title: 'Add team member',
                team: {},
                form: {
                    name: ''
                },
                errors: {},
                searchUser: (new Select2Options()).asAjax({
                    url: '/api/admin/users/search',
                    resultMap({id, name}) {
                        return {id, text: name};
                    }
                }).asTagable(),
            }
        },

        methods: {
            fetchTeam(team_id) {
                teams.find(team_id)
                    .then(team => this.team = team);
            },

            saveMember() {
                console.log('saveMember');
            }
        }
    }
</script>