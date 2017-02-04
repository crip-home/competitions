<template>
  <div>
    <h3>Hello.</h3>
    <p>You have been invited in to team <strong>{{ team }}</strong></p>
    <p>If you agree to join this team, click this button:
      <a href class="btn btn-success btn-sm" :class="{disabled}"
         @click.prevent="confirmInvitation">Confirm invitation</a>
    </p>
    <p>To decline invitation and send message to user, discard invitation:
      <a href class="btn btn-danger btn-sm" :class="{disabled}"
         @click.prevent="declineInvitation">Decline</a>
    </p>

    <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>
  </div>
</template>

<script>
  import teams from '../../../../api/teams'
  import members from '../../../../api/teams/members'
  import Message from '../../../../api/Message'

  export default {
    props: {
      message: {type: Message, required: true},
      onClose: {type: Function, required: true}
    },

    mounted () {
      this.checkInvitationStatus()
    },

    computed: {
      team () { return this.message.payload.from_team_name },
      user () { return this.message.payload.from_user_name },
      id () { return this.message.payload.member_id }
    },

    data () {
      return {
        error: '',
        disabled: false
      }
    },

    methods: {
      /**
       * Confirm invitation and go to messages route
       */
      confirmInvitation () {
        if (this.disabled) { return }
        teams.confirmInvitation(this.id)
          .then(
            _ => { this.onClose() },
            error => { this.error = error }
          )
      },

      /**
       * Decline invitation and go to messages route
       */
      declineInvitation () {
        if (this.disabled) { return }
        teams.declineInvitation(this.id)
          .then(
            _ => { this.onClose() },
            error => { this.error = error }
          )
      },

      checkInvitationStatus () {
        members.find(this.id)
          .then(
            member => {
              if (!member.isInvited) {
                this.error = 'Invitation is already accepted or declined.'
                this.disabled = true
              }
            },
            error => { this.error = error }
          )
      }
    }
  }
</script>