<template>
  <th class="sort-th clearfix" @click="enableSort">
    <slot></slot>
    <div class="pull-right" v-if="isEnabled">
      <span v-if="direction" class="fa fa-sort-asc"></span>
      <span v-else="" class="fa fa-sort-desc"></span>
    </div>
  </th>
</template>

<script>
  import Paging from './Paging'

  export default {
    name: 'sort-table-header',

    props: {
      paging: {type: Paging, required: true},
      column: {type: String, required: true}
    },

    data () {
      return {
        direction: true
      }
    },

    computed: {
      sortDirection () { return this.direction ? 'asc' : 'desc' },
      isEnabled () { return this.column === this.paging.sort }
    },

    methods: {
      /**
       * Change direction to opposite.
       * @returns {boolean}
       */
      toggleDirection () {
        if (this.isEnabled) {
          this.direction = !this.direction
          this.paging.direction = this.direction
          return true
        }

        return false
      },

      /**
       * Enable sort by current column.
       * @returns {boolean}
       */
      enableSort () {
        if (this.isEnabled) {
          return this.toggleDirection()
        }

        this.paging.sort = this.column
      }
    }
  }
</script>

<style lang="scss">
  .sort-th {
    cursor: pointer;

    &:hover {
      background-color: rgba(200, 200, 200, 0.3);
    }
  }
</style>
