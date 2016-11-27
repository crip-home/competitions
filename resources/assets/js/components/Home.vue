<template>
  <div>
    <h4>Home.vue</h4>
  </div>
</template>

<script>

    import * as aTypes from './../store/actions'

    export default {

        computed: {

            user() {
                return this.$store.state.auth.user
            }

        },

    }
</script>