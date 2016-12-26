<template>
  <ul class="pagination">
    <li v-for="page in pages" :class="{ active: page == currentPage }">
      <router-link :to="getRoute(page)">{{ page }}</router-link>
    </li>
  </ul>
</template>

<script>
    export  default {

        props: {
            currentPage: {type: Number, required: true},
            perPage: {type: Number, required: true},
            lastPage: {type: Number, required: true},
            route: {type: Object, required: true}
        },

        computed: {

            pages() {
                let pages = [];
                for (let i = 1; i <= this.lastPage; i++)
                    pages.push(i);

                return pages;
            },

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

        },

    }
</script>