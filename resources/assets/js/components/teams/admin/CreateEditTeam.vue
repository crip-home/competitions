<template>
  <panel :submit="saveTeam" :title="panelTitle" id="create-edit-team" class="col-md-12">

    <router-link slot="actions" :to="backRoute">Back to list</router-link>

    <form-group id="name" label="Name" :errors="errors.name">
      <input id="name" type="text" class="form-control" name="name" required v-model="form.name">
    </form-group>

    <form-group id="short" label="Short Name" :errors="errors.short">
      <input id="short" type="text" class="form-control" name="short" required v-model="form.short">
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

  </panel>
</template>

<script>
    import Vue from 'vue'
    import * as routes from './../../../router/routes'
    import teams from './../../../api/teams/admin'

    import Panel from './../../helpers/forms/Panel.vue'
    import FormGroup from './../../helpers/forms/FormGroup.vue'
    import SubmitArea from './../../helpers/forms/SubmitArea.vue'

    export default {

        mounted() {
            if (this.$route.name == routes.edit_team.name) {
                this.panelTitle = 'Edit team';
                this.fetchTeam(this.$route.params.id);
            }
        },

        data() {
            return {
                panelTitle: 'Create team',
                backRoute: routes.list_teams,
                form: {
                    name: '',
                    short: ''
                },
                errors: {}
            }
        },

        methods: {

            saveTeam() {
                teams.save(this.form)
                    .then(
                        _ => this.$router.push(routes.list_teams),
                        errors => Vue.set(this, 'errors', errors)
                    );
            },

            fetchTeam(teamId) {
                teams.find(teamId)
                    .then(team => this.form = team);
            },

        },

        components: {
            panel: Panel,
            formGroup: FormGroup,
            submit: SubmitArea,
        },

    }
</script>