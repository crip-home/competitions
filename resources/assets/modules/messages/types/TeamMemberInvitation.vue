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

    <p v-if="error" class="alert alert-danger text-center">{{ error }}</p>
    <p v-if="!isCurrentUserInvitation" class="alert alert-warning text-center">
      This invitation is sent to {{message.to_name}}
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as api from '../../teams/api'
  import Message from '../../../entities/Message'

  export default {
    props: {
      message: {type: Message, required: true},
      onClose: {type: Function, required: true}
    },

    mounted () {
      this.checkInvitationStatus()
    },

    computed: {
      ...mapGetters(['authUserId']),
      team () { return this.message.payload.from_team_name },
      user () { return this.message.payload.from_user_name },
      id () { return this.message.payload.member_id },
      isCurrentUserInvitation () { return this.message.to_id === this.authUserId },
      disabled () { return !this.isCurrentUserInvitation || this.checkFailed }
    },

    data () {
      return {
        error: '',
        checkFailed: false
      }
    },

    methods: {
      /**
       * Confirm invitation and go to messages route
       */
      confirmInvitation () {
        if (this.disabled) { return }
        api.members.confirmInvitation(this.id)
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
        api.members.declineInvitation(this.id)
          .then(
            _ => { this.onClose() },
            error => { this.error = error }
          )
      },

      /**
       * Determines current message invitation status
       * In case of incorrect state, sets checkFailed property to true
       */
      checkInvitationStatus () {
        api.members.find(this.id)
          .then(
            member => {
              if (!member.isInvited) {
                this.error = 'This invitation is not actual anymore.'
                this.checkFailed = true
              }
            },
            error => { this.error = error }
          )
      }
    }
  }
</script>
