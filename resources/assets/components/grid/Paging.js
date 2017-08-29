export default class Paging {
  constructor (vm, {
    route, activeClass = 'active', disabledClass = 'disabled', show = 5,
    sortBy = 'id', sortDirection = 'asc'
  }) {
    this.lastPage = 0
    this.items = []
    this.loading = true
    this.route = route
    this.activeClass = activeClass
    this.disabledClass = disabledClass
    this.show = show
    this.selected = {}

    this.$sort = vm.$route.params.sort || sortBy
    this.$direction = vm.$route.params.direction || sortDirection
    this.$perPage = parseInt(vm.$route.params.perpage) || 15
    this.$page = parseInt(vm.$route.params.page) || 1

    this.$vm = vm
  }

  toUrlParams () {
    return {
      sort_by: this.$sort,
      sort_direction: this.$direction,
      per_page: this.$perPage,
      page: this.$page
    }
  }

  setSort (value) {
    // TODO: mutate route
    this.$sort = value
  }

  setDirection (value) {
    // TODO: mutate route
    this.$direction = value
  }

  rowClasses (item, extra = {}) {
    return {
      'with-hidden-actions': true,
      [this.activeClass]: this.selected.id === item.id,
      ...extra
    }
  }

  select (item) {
    this.selected = item
  }

  update ({currentPage = 0, lastPage = 0, perPage = 0, items = [], loading = false}) {
    this.$page = currentPage
    this.$perPage = perPage
    this.lastPage = lastPage
    this.items = items
    this.loading = loading

    // this will allow return to page where we last time left
    this.route.params
      ? (this.route.params.page = this.$page)
      : (this.route.params = {page: this.$page})
  }

  /**
   * Initialize paging loading initial page data and setting up page change
   * handler.
   * @param {function(number)} callback
   */
  init (callback) {
    callback()
    this.$vm.$watch('$route.params', (newValues, oldValues) => {
      if (newValues.page !== oldValues.page ||
        newValues.sort !== oldValues.sort ||
        newValues.direction !== oldValues.direction ||
        newValues.perpage !== oldValues.perpage) {
        // update current paging values
        this.$page = parseInt(newValues.page)
        this.$perPage = parseInt(newValues.perpage) || 15
        this.$direction = newValues.direction
        this.$sort = newValues.sort
        // call callback after data in paging object was updated
        callback()
      }
    })
  }
}
