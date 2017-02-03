<template>
  <div class="col-md-12 jumbotron">
    <div v-if="isConfirm">Confirming...</div>
    <div v-else="" class="text-center">
      <h3>Are you sure you want to decline invitation?</h3>
      <p>
        <a class="btn btn-danger" href @click.prevent="declineInvitation">Yes</a>
        <a class="btn btn-success" href @click.prevent="confirmInvitation">No and accept</a>
      </p>
      <div v-if="error" class="alert alert-danger text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script>
  import teams from '../../api/teams'
  import { messagesRoute } from '../../router/routes'

  export default {
    mounted () {
      // in case of confirmation, assume user to press confirm btn
      if (this.$route.params.type === 'confirm') {
        this.confirmInvitation(this.$route.params.id)
      }
    },

    data () {
      return {
        isConfirm: this.$route.params.type === 'confirm',
        error: ''
      }
    },

    methods: {
      /**
       * Confirm invitation and go to messages route
       */
      confirmInvitation () {
        teams.confirmInvitation(this.$route.params.id)
          .then(
            _ => { this.$router.push(messagesRoute) },
            error => { this.error = error }
          )
      },

      /**
       * Decline invitation and go to messages route
       */
      declineInvitation () {
        teams.declineInvitation(this.$route.params.id)
          .then(
            _ => { this.$router.push(messagesRoute) },
            error => { this.error = error }
          )
      }
    }
  }
</script>