<template>
  <form-panel :submit="saveTeam" :title="panelTitle" id="create-edit-team" class="col-md-12">

    <panel-action slot="actions" :to="backRoute">Back to list</panel-action>

    <form-group id="team-logo" label="Logo" :errors="errors.logo">
      <input id="team-logo" type="file" name="logo" class="form-control" @change="onLogoChange">
      <div class="logo-preview" v-if="thumb">
        <hr>
        <img :src="thumb" alt="team-logo" class="img-thumbnail">
      </div>
    </form-group>

    <form-group id="name" label="Name" :errors="errors.name">
      <input id="name" type="text" class="form-control" name="name" required title="Name"
             v-model="form.name" v-focus="true">
    </form-group>

    <form-group id="short" label="Short Name" :errors="errors.short">
      <input id="short" type="text" class="form-control" name="short" required title="Short Name"
             v-model="form.short">
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

  </form-panel>
</template>

<script>
  import Vue from 'vue'
  import { teams } from '../../../api/teams/admin'
  import * as routes from '../../../router/routes'
  import fileUploader from '../../../api/files'

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
          logo_id: null,
          name: '',
          short: ''
        },
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
          .then(team => { this.form = team })
      },

      onLogoChange (event) {
        let files = event.target.files || event.dataTransfer.files
        if (files.length < 1) {
          return
        }

        fileUploader.upload(files[0])
          .then(file => {
            this.errors.file = null
            this.thumb = file.payload.thumbs.thumb
            this.form.logo_id = file.id
          })
          .catch((error) => {
            this.errors.logo = error.file
            this.thumb = ''
            this.form.logo_id = null
          })
      }
    }
  }
</script>