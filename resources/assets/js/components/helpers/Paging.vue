<template>
  <ul class="pagination">
    <li v-for="page in pages" :class="{ active: page == currentPage }">
      <a href @click.prevent="goTo(page)">{{ page }}</a>
    </li>
  </ul>
</template>

<script>
    export  default {

        props: {
            currentPage: {type: Number, required: true},
            perPage: {type: Number, required: true},
            lastPage: {type: Number, required: true},
            change: {type: Function, required: true}
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
            goTo(page) {
                if (page !== this.currentPage)
                    this.change(page);
            }
        },

    }
</script>