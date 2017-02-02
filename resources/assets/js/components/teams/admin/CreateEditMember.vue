<template>
  <form-panel id="create-edit-team-member" :submit="saveMember" :title="title">
    <panel-action slot="actions" v-if="team.id" :to="team.membersListRoute()">
      Back to {{ team.short }} members
    </panel-action>

    <form-errors :errors="concatErrors"></form-errors>

    <form-group id="name" label="Name" :errors="errors.name">
      <select2 id="name"
               @new="createNewMember"
               @input="createRelatedMember"
               :options="searchUser"></select2>
    </form-group>

    <submit v-if="form.user_id && form.user_id != user_id">
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
  import Select2Options from '../../helpers/forms/select2'
  import users from '../../../api/users/admin/users'
  import { teams, members } from '../../../api/teams/admin'
  import settings from '../../../settings'
  import { editTeamMember } from '../../../router/routes'

  export default {
    mounted () {
      this.fetchTeam(this.$route.params.team)
    },

    data () {
      let searchUser = new Select2Options()
      if (this.$route.name === editTeamMember.name) {
        // Fetch team member details from server and
        // pass this promise data to select2 initial selection
        searchUser = new Select2Options([], select => {
          this.fetchTeamMember(this.$route.params.id)
            .then(data => {
              select(data.name, data.user_id)
            })
        })
      }
      // configure option to make available creation of
      // new element in existing selection
      searchUser.asTagable()
      // configure to search results on server side
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
          name: '',
          id: 0
        },
        user_id: false,
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
          if (key !== 'name') {
            errors = errors.concat(this.errors[key])
          }
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
       * Fetch team member details from the server
       * @param {Number} memberId
       */
      fetchTeamMember (memberId) {
        return members.find(memberId, {teamId: this.$route.params.team})
          .then(member => {
            this.form.name = member.name
            this.form.user_id = member.user_id
            this.form.id = member.id
            this.user_id = member.user_id

            return member
          })
      },

      /**
       * Save new member
       */
      saveMember () {
        members.save(this.form, {teamId: this.$route.params.team})
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