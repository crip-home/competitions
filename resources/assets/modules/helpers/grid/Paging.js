export default class Paging {
  constructor (vm, {
    route, activeClass = 'active', disabledClass = 'disabled', show = 5,
    sortBy = 'id', sortDirection = 'asc'
  }) {
    this.currentPage = 0
    this.lastPage = 0
    this.perPage = 0
    this.items = []
    this.loading = true
    this.route = route
    this.activeClass = activeClass
    this.disabledClass = disabledClass
    this.show = show
    this.selected = {}

    this.$sort = sortBy
    this.$direction = sortDirection

    this.$vm = vm
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
    this.currentPage = currentPage
    this.lastPage = lastPage
    this.perPage = perPage
    this.items = items
    this.loading = loading

    // this will allow return to page where we last time left
    this.route.params
      ? (this.route.params.page = this.currentPage)
      : (this.route.params = {page: this.currentPage})
  }

  /**
   * Initialize paging loading initial page data and setting up page change
   * handler.
   * @param {function(number)} callback
   * @param {number} initialPage
   */
  init (callback, initialPage = 1) {
    callback(initialPage)
    this.$vm.$watch('$route.params.page', callback)
  }
}
