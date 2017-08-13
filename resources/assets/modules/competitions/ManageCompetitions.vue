<template>
  <grid id="manage-competitions" :paging="paging">
    <span slot="title">Manage competitions</span>
    <span slot="actions">
      <panel-action :to="createRoute" v-if="canCreateNew">
        Create new competition
      </panel-action>
    </span>

    <table class="table table-hover">
      <thead>
      <tr>
        <th>Title</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="competition in paging.items">
        <tr
            :class="paging.rowClasses(competition)"
            @click="paging.select(competition)"
        >
          <td>{{ competition.title }}&nbsp;
            <router-link
                :to="editRoute(competition)" class="label label-info actions"
            >
              Edit
            </router-link>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </grid>
</template>

<script>
  import * as api from './api'
  import * as routes from '../../router/routes'
  import Paging from '../helpers/grid/Paging'

  export default {
    name: 'manage-competitions',

    created () {
      this.$log.component(this)
      this.fetchPage(this.page)
    },

    data () {
      return {
        paging: new Paging({route: routes.listCompetitionsRoute})
      }
    },

    computed: {
      page () { return this.$route.params.page || 1 },
      createRoute () { return routes.createCompetitionRoute },
      // TODO: get user settings to find out is new competition allowed
      // if it is not, show title on disabled button
      canCreateNew () { return true }
    },

    methods: {
      fetchPage (page = 1) {
        api.manageCompetitions.get(page, this.paging.perPage)
          .then(data => this.paging.update(data))
      },

      editRoute (competition) {
        return {...routes.editCompetitionRoute, params: {id: competition.id}}
      }
    }
  }
</script>