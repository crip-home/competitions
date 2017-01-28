<template>
  <modal :on-hide="onHide" size="lg">
    <span slot="title">{{ message.subject }}</span>

    <form @submit.prevent="reply" class="modal-body">
      <div class="clearfix">From
        <strong>{{ message.from_name }}</strong>
        <span class="pull-right">{{ message.date_from_now }} ({{ message.created_at }})</span>
      </div>
      <br>
      <div class="clearfix">
        <blockquote v-html="message.body" class="col-md-12"></blockquote>
      </div>
      <div v-if="replyIsVisible" class="row">
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
      <button @click="showReply" v-if="!replyIsVisible" class="btn btn-primary">Reply</button>
      <button @click="reply" v-if="replyIsVisible" class="btn btn-primary">Send reply</button>
      <button @click="close" class="btn btn-default">Close</button>
    </div>
  </modal>
</template>

<script>
  import { messages } from '../../router/routes'
  import msg from '../../api/users/messages'

  export default {
    mounted () {
      msg.markAsRead(this.$route.params.id)
        .then(message => {
          this.form.subject = `Re: ${message.subject}`
          this.message = message
        })
    },

    data () {
      return {
        form: {
          body: '',
          subject: ''
        },
        errors: {},
        message: {},
        replyIsVisible: false
      }
    },

    methods: {
      /**
       * React on modal hide event
       */
      onHide () {
        this.$router.push(messages)
      },

      close () {
        // TODO: we need more elegant way to close modals
        $(this.$el).find('button.close').trigger('click')
      },

      /**
       * Make reply section visible for user
       */
      showReply () {
        this.replyIsVisible = true
      },

      /**
       * Send an a reply on current message
       */
      reply () {
        msg.reply(this.$route.params.id, this.form)
      }
    },

    destroyed () {
      // ensure that there is no backdrops when leaving this component
      $('.modal-backdrop').remove()
    }
  }
</script>