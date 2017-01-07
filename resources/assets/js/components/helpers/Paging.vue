<template>
  <ul class="pagination" v-if="hasMoreThanOnePage">
    <li v-for="page in pages" :class="getPageClass(page)">
      <router-link :to="getRoute(page.nr)">{{ page.text }}</router-link>
    </li>
  </ul>
</template>

<script>
    import Vue from 'vue'

    export  default {

        props: {
            currentPage: {type: Number, required: true},
            perPage: {type: Number, required: true},
            lastPage: {type: Number, required: true},
            route: {type: Object, required: true},
            activeClass: {type: String, required: false, 'default': 'active'},
            disabledClass: {type: String, required: false, 'default': ''}
        },

        computed: {

            pages() {
                let prev = {text: '«', nr: (this.currentPage > 1 ? this.currentPage - 1 : 1)};
                let next = {text: '»', nr: (this.currentPage < this.lastPage ? this.currentPage + 1 : this.lastPage)};

                let pages = [prev];
                for (let i = 1; i <= this.lastPage; i++)
                    pages.push({text: i, nr: i});

                pages.push(next);

                return pages;
            },

            hasMoreThanOnePage() {
                return this.pages.length > 3;
            }
        },

        methods: {

            getRoute(page) {
                let route = JSON.parse(JSON.stringify(this.route));

                if (!route.params)
                    route.params = {page};
                else
                    route.params.page = page;

                return route;
            },

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