export default class Paging {
    constructor(route) {
        this.current_page = 0;
        this.last_page = 0;
        this.per_page = 0;
        this.items = [];
        this.loading = true;
        this.route = route;
        this.selected = {};
    }

    rowClasses(item) {
        return {
            'with-hidden-actions': true,
            'active': this.selected.id === item.id
        }
    }

    select(item) {
        this.selected = item;
    }

    update({current_page = 0, last_page = 0, per_page = 0, items = [], loading = false}) {
        this.current_page = current_page;
        this.last_page = last_page;
        this.per_page = per_page;
        this.items = items;
        this.loading = loading;

        // this will allow return to page where we last time left
        this.route.params ?
            (this.route.params.page = this.current_page) :
            (this.route.params = {page: this.current_page});
    }
}