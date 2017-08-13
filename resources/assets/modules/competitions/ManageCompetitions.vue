<template>
  <section id="list-competitions">
    List Competitions View
  </section>
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
      page () { return this.$route.params.page || 1 }
    },

    methods: {
      fetchPage (page = 1) {
        api.manageCompetitions.get(page, this.paging.perPage)
          .then(data => this.paging.update(data))
      }
    }
  }
</script>