<template>
  <div>
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
            <td>{{ message.from_name }}</td>
            <td>{{ message.subject }}</td>
            <td>{{ message.date_from_now }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </grid>

    <router-view></router-view>
  </div>
</template>

<script>
  import { messages, message } from '../../router/routes'

  import msg    from '../../api/users/messages'
  import Paging from '../helpers/grid/Paging'

  export default {
    mounted () {
      if (!messages.params) {
        messages.params = {page: 1}
      }

      if (!messages.params.page) {
        messages.params.page = 1
      }

      this.fetchMessages(messages.params.page)
    },

    data () {
      return {
        paging: new Paging({route: messages})
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
        this.$router.push({...message, params: {id: currMessage.id}})
      }
    },

    watch: {
      '$route.params.page' (page) {
        this.fetchMessages(page || messages.params.page)
      },

      '$route' () {
        // ensure that there is no backdrops when entering this route
        $('.modal-backdrop').remove()
      }
    }
  }
</script>