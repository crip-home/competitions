export default {
  created () {
    this.$log.component(this)
  },

  computed: {
    page () { return this.$route.params.page || 1 },
    isAuthorized () { return this.$state.state.auth.authUser.authenticated }
  }
}
