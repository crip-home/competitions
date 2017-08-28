<template>
  <crip-modal @hidden="close" size="lg">
    <span slot="title">New Message</span>
    <form @submit.prevent="sendMessage" class="modal-body">
      <div class="row">

        <form-group id="to" class="clearfix" :col-lg="12" :errors="errors.to">
          <select2 id="to" v-model="form.to" :options="searchUser">
            <option disabled value="">Find recipient</option>
          </select2>
        </form-group>

        <form-group
            id="subject" :errors="errors.subject" :col-lg="12" class="clearfix"
        >
          <input
              id="subject" type="text" class="form-control" name="subject"
              required title="Subject" placeholder="Subject"
              v-model="form.subject"
          >
        </form-group>

        <form-group
            id="message-body" :errors="errors.body" :col-lg="12"
            class="clearfix"
        >
          <ckeditor v-model="form.body" id="message-body" :focus="true">
          </ckeditor>
        </form-group>

      </div>
    </form>
    <div class="modal-footer">
      <button @click="sendMessage" class="btn btn-primary">Send message</button>
      <button @click="close" class="btn btn-default">Close</button>
    </div>
  </crip-modal>
</template>

<script>
  import { messagesRoute } from '../../router/routes'
  import Select2Options from '../../components/forms/select2/index'
  import settings from '../../settings'
  import msg from './api'

  export default {
    data () {
      let searchUser = new Select2Options()
      // configure to search results on server side
      searchUser.asAjax({
        url: settings.apiUrl('admin/users/search'),
        resultMap ({id, name}) {
          return {id, text: name}
        }
      })

      return {
        form: {
          to: '',
          body: '',
          subject: ''
        },
        errors: {},
        searchUser
      }
    },

    methods: {
      /**
       * Close modal
       */
      close () {
        this.$router.push(messagesRoute)
      },

      /**
       * Send an a message
       */
      sendMessage () {
        msg.send(this.form)
          .then(
            () => { this.close() },
            errors => { this.errors = errors }
          )
      }
    }
  }
</script>

<style>
  .select2-container--bootstrap {
    width: auto !important;
  }
</style>