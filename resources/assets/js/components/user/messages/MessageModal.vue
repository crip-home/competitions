<template>
  <modal :id="modalId" :on-hide="onHide" size="lg">
    <span slot="title">{{ message.subject }}</span>

    <table class="table table-hover">
      <tbody>
      <template v-for="message in messages">
        <tr @click="toggleMessage(message)" class="pointer" :class="messageHeaderClass(message)">
          <td>
            From <strong>{{ message.from_name }}</strong>
            <span class="pull-right">{{ message.date_from_now }} ({{ message.created_at }})</span>
          </td>
        </tr>
        <tr v-if="message.isOpen">
          <td>
            <blockquote class="message-body">
              <div v-if="message.isUserMessage" v-html="message.body"></div>
              <team-member-invitation v-else-if="message.isTeamMemberInvitation"
                                      :message="message" :on-close="close"></team-member-invitation>
            </blockquote>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <form @submit.prevent="reply" v-if="replyIsVisible" class="modal-body">
      <div class="row">

        <form-group id="subject" :errors="errors.subject" :col-lg="12" class="clearfix">
          <input id="subject" type="text" class="form-control" name="subject" required title="Subject"
                 placeholder="Subject" v-model="form.subject">
        </form-group>

        <form-group id="message-body" :errors="errors.body" :col-lg="12" class="clearfix">
          <ckeditor v-model="form.body" id="message-body" :focus="true"></ckeditor>
        </form-group>

      </div>
    </form>
    <div class="modal-footer">
      <button @click="showReply" v-if="!replyIsVisible && canReply" class="btn btn-primary">Reply</button>
      <button @click="reply" v-if="replyIsVisible && canReply" class="btn btn-primary">Send reply</button>
      <button @click="close" class="btn btn-default">Close</button>
    </div>
  </modal>
</template>

<script>
  import TeamMemberInvitation from './types/TeamMemberInvitation.vue'
  import { messagesRoute } from '../../../router/routes'
  import { MODAL_CLOSE } from '../../../store/types'
  import msg from '../../../api/users/messages'

  export default {
    mounted () {
      this.getData(this.$route.params.id)
      // reply is available only if user is opened message
      // from inbox grid
      this.canReply = this.$route.params.type === 'inbox'
    },

    data () {
      return {
        form: {
          body: '',
          subject: ''
        },
        errors: {},
        message: {},
        messages: [],
        replyIsVisible: false,
        canReply: false,
        modalId: 'message-modal',
        complete: false
      }
    },

    methods: {
      /**
       * React on modal hide event
       */
      onHide () {
        // Redirect to messages list route
        this.$router.push(messagesRoute)
      },

      /**
       * Close modal
       */
      close () {
        // commit to vuex for current modal close
        this.$store.commit(MODAL_CLOSE, this.modalId)
      },

      /**
       * Make reply section visible for user
       */
      showReply () {
        this.replyIsVisible = true
      },

      /**
       * Fetch data from server
       *
       * @param {number} id
       */
      getData (id) {
        msg.markAsRead(id)
          .then(message => {
            this.form.subject = message.subject.indexOf('Re: ') === 0
              ? message.subject : `Re: ${message.subject}`

            this.flattenMessages(message)
          })
      },

      /**
       * Flatten recursive object to list of messages
       *
       * @param {Message} message
       * @param {Boolean} isInitial
       */
      flattenMessages (message, isInitial = true) {
        if (isInitial) {
          message.isOpen = true
          this.message = message
        }

        this.messages.push(message)

        if (message.reply_on) {
          this.flattenMessages(message.reply_on, false)
        }
      },

      /**
       * Toggle message visibility
       *
       * @param {Message} message
       */
      toggleMessage (message) {
        message.isOpen = !message.isOpen
      },

      /**
       * Resolve message classes
       *
       * @param {Message} message
       */
      messageHeaderClass (message) {
        return {
          active: !message.isOpen
        }
      },

      /**
       * Send an a reply on current message
       */
      reply () {
        msg.reply(this.$route.params.id, this.form)
          .then(
            _ => this.onHide(),
            errors => { this.errors = errors }
          )
      }
    },

    components: {
      TeamMemberInvitation
    }
  }
</script>

<style>
  .pointer {
    cursor: pointer;
  }

  blockquote.message-body, table.table {
    margin: 0
  }
</style>