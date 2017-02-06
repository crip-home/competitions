<template>
  <section id="team-details">
    Team details
  </section>
</template>

<script>
  import { logComponent } from '../../ext/Log'
  import teamsApi from '../../api/teams'

  export default {
    name: 'team-details',

    mounted () {
      logComponent(this)
      let teamId = this.$route.params.team
      this.fetchTeamDetails(teamId)
      this.fetchTeamMembers(teamId)
    },

    data () {
      return {
        team: {}
      }
    },

    methods: {
      fetchTeamDetails (teamId) {
        teamsApi.find(teamId)
          .then(team => { this.team = team })
      },

      fetchTeamMembers (teamId) {

      }
    }
  }
</script>