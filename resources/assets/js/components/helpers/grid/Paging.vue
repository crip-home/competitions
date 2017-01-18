<template>
  <ul class="pagination" v-if="hasMoreThanOnePage">
    <li v-for="page in pages" :class="getPageClass(page)">
      <router-link :to="getRoute(page.nr)">{{ page.text }}</router-link>
    </li>
  </ul>
</template>

<script>
    import Vue  from 'vue'
    import Page from './Page'

    export default {

        props: {
            currentPage: {type: Number, required: true},
            perPage: {type: Number, required: true},
            lastPage: {type: Number, required: true},
            route: {type: Object, required: true},
            activeClass: {type: String, required: false, 'default': 'active'},
            disabledClass: {type: String, required: false, 'default': 'disabled'},
            show: {type: Number, required: false, 'default': 5}
        },

        computed: {

            pages() {
                let prev = Page.prev(this.currentPage);
                let next = Page.next(this.currentPage, this.lastPage);

                let pages = [prev];

                // if page count greater than showable, calculate where place ...
                if (this.lastPage > this.show) {
                    let delta = ~~(this.show / 2);
                    let startFrom = this.currentPage - delta;
                    let endOn = this.currentPage + delta;

                    if (startFrom < 1) startFrom = 1;
                    if (startFrom > 1) {
                        // Add page 1 at the beginning
                        pages.push(new Page(1, 1));
                        // If first page is not 2, push ...
                        if (startFrom - 1 !== 1)
                            pages.push(new Page('...', 0));
                    }

                    if (endOn > this.lastPage) endOn = this.lastPage;

                    // add all visible pages
                    for (let i = startFrom; i <= endOn; i++)
                        pages.push(new Page(i, i));

                    if (endOn < this.lastPage) {
                        // if there is pages between last and last visible, show ... between them
                        if (this.lastPage - 1 !== endOn)
                            pages.push(new Page('...', 0));
                        // Add last page to the end of paging
                        pages.push(new Page(this.lastPage, this.lastPage));
                    }

                    pages.push(next);

                    return pages;
                }

                for (let i = 1; i <= this.lastPage; i++)
                    pages.push(new Page(i, i));

                pages.push(next);

                return pages;
            },

            hasMoreThanOnePage() {
                return this.pages.length > 3;
            }
        },

        methods: {

            /**
             * @param {Page} page
             * @returns {Object}
             */
            getRoute(page) {
                let route = JSON.parse(JSON.stringify(this.route));
                if (!page)
                    page = this.currentPage;

                if (!route.params)
                    route.params = {page};
                else
                    route.params.page = page;

                return route;
            },

            /**
             * @param {Page} page
             * @returns {String}
             */
            getPageClass(page) {
                if ((page.nr | 0) === (this.currentPage | 0)) {
                    if ((page.text | 0) === 0)
                        return this.disabledClass;

                    return this.activeClass;
                }

                return '';
            }

        }

    }
</script>