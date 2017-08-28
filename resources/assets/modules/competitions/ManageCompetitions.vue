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
  import api from './api-manage-competitons'
  import Paging from '../../components/grid/Paging'
  import {
    createRoute,
    editCompetitionRoute,
    createCompetitionRoute,
    listCompetitionsRoute
  } from '../../router/routes'

  export default {
    name: 'manage-competitions',

    data () {
      return {
        paging: new Paging(this, {route: listCompetitionsRoute})
      }
    },

    created () {
      this.$log.component(this)
      this.paging.init(page => this.fetchPage(page), this.page)
    },

    computed: {
      page () { return this.$route.params.page || 1 },
      createRoute () { return createCompetitionRoute },
      // TODO: get user settings to find out is new competition allowed
      // if it is not, show title on disabled button
      canCreateNew () { return true }
    },

    methods: {
      async fetchPage (page = 1) {
        this.paging.loading = true
        const results = await api.get(page, this.paging.perPage)
        this.paging.update(results)
      },

      editRoute (competition) {
        return createRoute(editCompetitionRoute, {id: competition.id})
      }
    }
  }
</script>