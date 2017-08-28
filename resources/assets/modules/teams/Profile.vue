<template>
  <section id="team-details" class="col-md-12">
    <div class="row">
      <div class="col-md-2 col-sm-3">
        <img
            v-if="team.logo" :src="team.logo.thumb" width="265" height="265"
            class="img-responsive img-thumbnail"
        >
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
        <tabs :tabs="tabs">

          <tab
              :for="tabs" name="members" header="Members"
              :on-selected="setMembersTab"
          >
            <br>
            <grid
                id="list-team-members" :paging="membersPaging"
                :hide-header="true"
            >
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Name</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="member in membersPaging.items">
                  <tr
                      @click="membersPaging.select(member)"
                      :class="membersPaging.rowClasses(member)">
                    <td>
                      {{ member.name }}&nbsp;
                      <router-link
                          v-if="member.user" :to="member.user.profileRoute"
                          class="label label-info actions">
                        Profile
                      </router-link>
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </grid>

          </tab>

          <tab
              :for="tabs" name="coaches" header="Coaches"
              :on-selected="setCoachesTab"
          >
            List of coaches
          </tab>

        </tabs>
      </div>
    </div>
  </section>
</template>

<script>
  import * as api from './api'
  import Paging from '../../components/grid/Paging'
  import Tabs from '../../components/bootstrap/tabs/index'
  import { publicTeamDetailsRoute } from '../../router/routes'

  export default {
    name: 'team-details',

    data () {
      return {
        tabs: new Tabs(),
        team: {
          logo: {}
        },
        membersPaging: new Paging(this, {route: publicTeamDetailsRoute})
      }
    },

    created () {
      this.$log.component(this)
      let {team, tab, page} = this.$route.params

      this.fetchTeamDetails(team)

      if (tab === 'members') {
        this.fetchTeamMembers(team, page)
      }
    },

    computed: {
      hasCoaches () { return this.team.coaches && (this.team.coaches.length > 0) },
      tab () { return this.$route.params.tab }
    },

    methods: {
      /**
       * Set as actual members tab of team profile
       */
      setMembersTab () {
        if (this.team.id) {
          this.$router.push({
            ...publicTeamDetailsRoute,
            params: {page: 1, tab: 'members'}
          })
        }
      },

      /**
       * Set as actual coaches tab of team profile
       */
      setCoachesTab () {
        if (this.team.id) {
          this.$router.push({
            ...publicTeamDetailsRoute,
            params: {page: 1, tab: 'coaches'}
          })
        }
      },

      /**
       * Fetch team details from the server
       */
      fetchTeamDetails (teamId) {
        api.teams.find(teamId)
          .then(team => { this.team = team })
      },

      /**
       * Fetch team members data from server
       * @param {Number} teamId
       * @param {Number} [page]
       */
      fetchTeamMembers (teamId, page = 1) {
        this.membersPaging.loading = true
        api.members.getForTeam(teamId, page, this.membersPaging.perPage || 15)
          .then(data => this.membersPaging.update(data))
      }
    },

    watch: {
      '$route' ({params: {team, tab, page}}) {
        if (tab === 'members') {
          this.fetchTeamMembers(team, page)
        }

        if (tab === 'coaches') {
          this.$log.error('TODO: fetch coaches')
        }
      }
    }
  }
</script>