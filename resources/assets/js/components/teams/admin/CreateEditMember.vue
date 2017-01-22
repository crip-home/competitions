<template>
  <form-panel id="create-edit-team-member" :submit="saveMember" :title="title">
    <panel-action slot="actions" v-if="team.id" :to="team.membersListRoute()">
      Back to {{ team.short }} members
    </panel-action>

    <form-errors :errors="concatErrors"></form-errors>

    <form-group id="name" label="Name">
      <select2 id="name"
               @new="createNewMember"
               @input="createRelatedMember"
               :options="searchUser"></select2>
    </form-group>

    <submit v-if="form.user_id">
      <span>
        <button type="button" @click="dismissInvitation" class="close text-danger">&times;</button>
        {{form.name}} will receive invitation to join {{ team.short }} team
      </span>
    </submit>

    <submit>
      <button type="submit" class="btn btn-primary">Save</button>
    </submit>

  </form-panel>
</template>

<script>
  import Select2Options     from './../../helpers/forms/select2'
  import users              from './../../../api/users/admin/users'
  import { teams, members } from './../../../api/teams/admin'
  import settings           from './../../../settings'

  export default {
    mounted () {
      this.fetchTeam(this.$route.params.team)
    },

    data () {
      let searchUser = new Select2Options()
      // adds option to create new element in selection
      searchUser.asTagable()
      // results search in server side
      searchUser.asAjax({
        url: settings.apiUrl('admin/users/search'),
        resultMap ({id, name}) {
          return {id, text: name}
        }
      })

      return {
        title: 'Add team member',
        team: {},
        form: {
          user_id: '',
          name: ''
        },
        errors: {},
        searchUser
      }
    },

    computed: {
      /**
       * Concat all server errors in to single array
       */
      concatErrors () {
        let errors = []
        Object.keys(this.errors).forEach(key => {
          errors = errors.concat(this.errors[key])
        })

        return errors
      }
    },

    methods: {
      /**
       * Fetch team details from the server
       * @param {Number} teamId
       */
      fetchTeam (teamId) {
        teams.find(teamId)
          .then(team => { this.team = team })
      },

      /**
       * Save new member
       */
      saveMember () {
        members.save(this.form, {team_id: this.team.id})
          .then(
            _ => { this.$router.push(this.team.membersListRoute()) },
            errors => { this.errors = errors }
          )
      },

      /**
       * Create new member without user reference
       * @param {String} name
       */
      createNewMember (name) {
        this.form.name = name
        this.form.user_id = ''
      },

      /**
       * Create new member with user id reference
       * @param {Number} userId
       */
      createRelatedMember (userId) {
        if (userId) {
          this.form.user_id = userId
          users.find(userId)
            .then(user => { this.form.name = user.name })
        }
      },

      /**
       * Dismiss invitation for selected user
       */
      dismissInvitation () {
        this.form.user_id = ''
      }
    }
  }
</script>

<style>
  button.close.text-danger {
    float: none;
    font-weight: bolder;
  }
</style>