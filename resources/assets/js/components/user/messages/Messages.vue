<template>
  <div class="row">
    <div class="col-md-2 col-sm-3">
      <div class="list-group">
        <a class="list-group-item list-group-item-info" href="#" @click.prevent="newMessage">New Message</a>
        <a class="list-group-item" href="#" @click.prevent="showInbox">Inbox <span class="badge">{{ 1 }}</span></a>
        <a class="list-group-item" href="#" @click.prevent="showOutbox">Outbox</a>
      </div>
    </div>
    <div class="col-md-10 col-sm-9">
      <div class="row">
        <grid id="messages-list" :paging="paging">
          <span slot="title">Messages</span>
          <table class="table table-hover table-condensed">
            <thead>
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Subject</th>
              <th>When</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="message in paging.items">
              <tr @click="openMessage(message)" :class="paging.rowClasses(message, {active: !message.is_read})">
                <td><i class="fa" :class="messageClass(message)"></i></td>
                <td>{{ message.from_name }} <span v-if="message.reply_count">( {{ message.reply_count }} )</span></td>
                <td>{{ message.subject }}</td>
                <td>{{ message.date_from_now }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </grid>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import { messagesRoute, messageRoute } from '../../../router/routes'

  import msg from '../../../api/users/messages'
  import Paging from '../../helpers/grid/Paging'

  export default {
    mounted () {
      if (!messagesRoute.params) {
        messagesRoute.params = {page: 1, type: 'inbox'}
      }

      if (!messagesRoute.params.page) {
        messagesRoute.params.page = 1
      }

      if (!messagesRoute.params.type) {
        messagesRoute.params.type = 'inbox'
      }

      this.fetchMessages(messagesRoute.params.page)
    },

    data () {
      return {
        paging: new Paging({route: messagesRoute})
      }
    },

    methods: {
      /**
       * Fetch messages from api
       *
       * @param {Number} page
       */
      fetchMessages (page) {
        this.paging.loading = true
        msg.get(page, this.paging.perPage || 25)
          .then(messages => this.paging.update(messages))
      },

      /**
       * Resolve message class
       *
       * @param {Message} message
       */
      messageClass (message) {
        let colors = {
          10: 'not-important',
          9: 'semi-not-important',
          8: 'middle-important',
          7: 'semi-important'
        }
        let color = colors[message.importance_level] || 'important'
        color = 'text-' + color

        return {
          'fa-envelope-open': message.is_read,
          'fa-envelope': !message.is_read,
          [color]: true
        }
      },

      /**
       * Open message modal
       * @param {Message} currMessage
       */
      openMessage (currMessage) {
        this.$router.push({...messageRoute, params: {id: currMessage.id}})
      },

      newMessage () {
        console.log('newMessage')
      },

      showInbox () {
        console.log('showInbox')
      },

      showOutbox () {
        console.log('showOutbox')
      }
    },

    watch: {
      '$route.params.page' (page) {
        this.fetchMessages(page || messagesRoute.params.page)
      }
    }
  }
</script>