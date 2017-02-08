<template>
  <section id="team-details" class="col-md-12">
    <div class="row">
      <div class="col-md-2 col-sm-3">
        <img v-if="team.logo" :src="team.logo.thumb" width="265" height="265" class="img-responsive img-thumbnail">
        <h2>{{ team.name }}</h2>
        <p>
          <small>Created {{ team.created_from_now }}</small>
        </p>
        <div v-if="hasCoaches">
          <hr>
          <h4>Teams</h4>
          <template v-for="coach in team.coaches">
            <router-link :to="coach.profileRoute" :title="coach.name">
              <gravatar v-if="coach.md5" :md5="coach.md5" :size="35"></gravatar>
              <span v-else="">{{ coach.name }}</span>
            </router-link>
            &nbsp;
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
        team: {
          logo: {}
        }
      }
    },

    computed: {
      hasCoaches () { return this.team.coaches && this.team.coaches.length > 0 }
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