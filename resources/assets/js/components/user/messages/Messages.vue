<template>
  <div class="row">
    <div class="col-md-2 col-sm-3">
      <div class="list-group">
        <a class="list-group-item list-group-item-info" href="#" @click.prevent="newMessage">New Message</a>

        <router-link :to="inboxRoute" active-class="active" class="list-group-item">
          Inbox <span class="badge">{{ unreadMessages }}</span>
        </router-link>

        <router-link :to="outboxRoute" active-class="active" class="list-group-item">
          Outbox
        </router-link>
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
        messagesRoute.params = {
          page: this.$route.params.page || 1,
          type: this.$route.params.type
        }
      }

      if (!messagesRoute.params.page) {
        messagesRoute.params.page = this.$route.params.page
      }

      if (!messagesRoute.params.type) {
        messagesRoute.params.type = this.$route.params.type
      }

      let {page, type} = messagesRoute.params
      this.fetchMessages(page, type)
    },

    data () {
      return {
        paging: new Paging({route: messagesRoute})
      }
    },

    computed: {
      inboxRoute () {
        return {
          ...messagesRoute, params: {type: 'inbox'}
        }
      },

      outboxRoute () {
        return {
          ...messagesRoute, params: {type: 'outbox'}
        }
      },

      unreadMessages () {
        return this.$store.state.messages.unread
      }
    },

    methods: {
      /**
       * Fetch messages from api
       *
       * @param {Number} page
       * @param {String} messageType
       */
      fetchMessages (page, messageType) {
        this.paging.loading = true
        msg.get(messageType, page, this.paging.perPage || 25)
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
      }
    },

    watch: {
      '$route.params' ({page, type}) {
        messagesRoute.params.type = type
        this.fetchMessages(page || 1, type)
      }
    }
  }
</script>