<template>
  <form-panel
      id="create-edit-team" class="col-md-12" :submit="saveTeam"
      :title="panelTitle"
  >
    <span slot="actions">
      <panel-action :to="backRoute">Teams</panel-action>
      <panel-action :to="membersRoute" v-if="isEdit">Members</panel-action>
    </span>

    <form-group id="team-logo" label="Logo" :errors="errors.logo">
      <div class="input-group">
        <input
            id="team-logo" type="text" name="logo" disabled class="form-control"
            v-model="form.logo" v-focus="true"
        >
        <span class="input-group-btn">
          <button
              class="btn btn-default" type="button" @click="openFilesys"
          >
            File
          </button>
        </span>
      </div>
      <div class="logo-preview" v-if="thumb">
        <hr>
        <img :src="thumb" alt="team-logo" class="img-thumbnail">
      </div>
    </form-group>

    <form-group id="name" label="Name" :errors="errors.name">
      <input
          id="name" type="text" class="form-control" name="name" required
          title="Name" v-model="form.name"
      >
    </form-group>

    <form-group id="short" label="Short Name" :errors="errors.short">
      <input
          id="short" type="text" class="form-control" name="short" required
          title="Short Name" v-model="form.short"
      >
    </form-group>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

    <filesys-modal
        :target.sync="form.logo" :open.sync="filesysIsOpen"
        @selected="refreshThumb" image="profile"
    ></filesys-modal>

  </form-panel>
</template>

<script>
  import * as routes from '../../router/routes'
  import Vue from 'vue'
  import { manageTeams } from './api'

  export default {
    mounted () {
      if (this.isEdit) {
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
          name: '',
          short: ''
        },
        filesysIsOpen: false,
        errors: {}
      }
    },

    computed: {
      /**
       * Determines is the current form open in edit mode.
       * @return {Boolean}
       */
      isEdit () {
        return this.$route.name === routes.editTeam.name
      },

      /**
       * Team members list route.
       * @return {{params: {team}}}
       */
      membersRoute () {
        return {
          ...routes.listTeamMembers,
          params: {team: this.$route.params.id}
        }
      }
    },

    methods: {
      /**
       * Save team details with server API.
       */
      saveTeam () {
        manageTeams.save(this.form)
          // Redirect to teams list when team is saved.
          .then(() => this.$router.push(routes.listTeams))
          // Display errors if server validation failed.
          .catch(errors => Vue.set(this, 'errors', errors))
      },

      /**
       * Fetch team details from server API.
       * @param {Number} teamId
       */
      fetchTeam (teamId) {
        manageTeams.find(teamId)
          .then(team => {
            this.form = team

            if (team.logo) {
              this.thumb = team.logo
            }
          })
      },

      /**
       * Open FileSys modal for a file select.
       */
      openFilesys () {
        this.filesysIsOpen = true
      },

      /**
       * Refresh thumb value.
       * @param {String} fileUrl
       */
      refreshThumb (fileUrl) {
        this.thumb = fileUrl
      }
    }
  }
</script>