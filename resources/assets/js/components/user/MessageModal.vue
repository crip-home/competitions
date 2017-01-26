<template>
  <modal :on-hide="onHide" :on-show="onShow">
    Hello
  </modal>
</template>

<script>
  import { messages } from '../../router/routes'

  import msg from '../../api/users/messages'

  export default {
    methods: {
      onShow () {
        msg.markAsRead(this.$route.params.id)
      },

      onHide () {
        this.$router.push(messages)
      }
    }
  }
</script>