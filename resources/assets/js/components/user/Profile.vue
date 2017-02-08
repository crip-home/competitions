<template>
  <section id="user-profile" class="col-md-12">
    <div class="row">
      <div class="col-md-2 col-sm-3">
        <gravatar :md5="user.md5" :size="265" class="hidden-xs"></gravatar>
        <h2>{{ user.name }}</h2>
        <p>
          <small>Registered {{ user.created_from_now }}</small>
        </p>
        <div v-if="hasTeams">
          <hr>
          <h4>Teams</h4>
          <template v-for="team in user.teams">
            <router-link :to="team.pDetailsRoute" :title="team.name">
              <img v-if="team.logo" :src="team.logo.xs" width="35" height="35">
              <span v-else="">{{ team.short }}</span>
            </router-link>&nbsp;
          </template>
        </div>
      </div>
      <div class="col-md-9">
        content
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isAuth } from '../../store/getters'
  import profile from '../../api/users/profile'

  export default {
    mounted () {
      if (this.user.id === 0 && this[isAuth]) {
        // fetch profile only if user is already authenticated
        this.fetchProfile(0)
      } else if (this.user.id > 0) {
        // to see other user details, we have no need to authorize
        this.fetchProfile(this.user.id)
      }
    },

    data () {
      return {
        user: {
          id: (this.$route.params.id | 0),
          md5: 'default',
          teams: []
        }
      }
    },

    computed: {
      ...mapGetters([isAuth]),
      hasTeams () { return this.user.teams.length > 0 }
    },

    methods: {
      fetchProfile (userId) {
        profile.find(userId)
          .then(user => { this.user = user })
      }
    },

    watch: {
      [isAuth] (to, from) {
        if (this.user.id === 0 && !from && to) {
          // watch authentication and fetch data from server when user is authorized
          this.fetchProfile(this.user.id)
        }
      }
    }
  }
</script>