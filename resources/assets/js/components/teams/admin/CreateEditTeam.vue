<template>
  <form-panel :submit="saveTeam" :title="panelTitle" id="create-edit-team" class="col-md-12">

    <panel-action slot="actions" :to="backRoute">Back to list</panel-action>

    <form-group id="team-logo" label="Logo" :errors="errors.logo">
      <div class="input-group">
        <input id="team-logo" type="url" name="logo" class="form-control" v-model="form.logo" v-focus="true">
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="openFilesys">File</button>
        </span>
      </div>
    </form-group>

    <form-group id="name" label="Name" :errors="errors.name">
      <input id="name" type="text" class="form-control" name="name" required title="Name" v-model="form.name">
    </form-group>

    <form-group id="short" label="Short Name" :errors="errors.short">
      <input id="short" type="text" class="form-control" name="short" required title="Short Name"
             v-model="form.short">
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

    <filesys-modal :target.sync="form.logo" :open.sync="filesysIsOpen"></filesys-modal>

  </form-panel>
</template>

<script>
  import Vue from 'vue'
  import { teams } from '../../../api/teams/admin'
  import * as routes from '../../../router/routes'

  export default {
    mounted () {
      if (this.$route.name === routes.editTeam.name) {
        this.panelTitle = 'Edit team'
        this.fetchTeam(this.$route.params.id)
      }
    },

    data () {
      return {
        panelTitle: 'Create team',
        backRoute: routes.listTeams,
        thumb: '',
        form: {
          logo: '',
          // TODO: Remove logo_id from API
          logo_id: null,
          name: '',
          short: ''
        },
        filesysIsOpen: false,
        errors: {}
      }
    },

    methods: {
      saveTeam () {
        teams.save(this.form)
          .then(
            _ => this.$router.push(routes.listTeams),
            errors => Vue.set(this, 'errors', errors)
          )
      },

      fetchTeam (teamId) {
        teams.find(teamId)
          .then(team => {
            this.form = team
            if (team.logo) {
              this.thumb = team.logo.thumb
            }
          })
      },

      /**
       * Open FileSys modal for a file select.
       */
      openFilesys () {
        this.filesysIsOpen = true
      }
    }
  }
</script>