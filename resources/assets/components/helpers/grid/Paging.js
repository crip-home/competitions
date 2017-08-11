export default class Paging {
  constructor ({route, activeClass = 'active', disabledClass = 'disabled', show = 5}) {
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
}
