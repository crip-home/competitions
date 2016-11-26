<template>
  <div>
    <h4>Home.vue</h4>
  </div>
</template>

<script>

    import * as aTypes from './../store/actions'

    export default {

        mounted() {
            this.$store.dispatch(aTypes.USER_AUTHORISE_GET_DETAILS)
        },

        computed: {

            user() {
                return this.$store.state.auth.user
            }

        },

    }
</script>