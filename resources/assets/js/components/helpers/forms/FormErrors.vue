<template>
  <ul class="help-block" v-if="errors">
    <li v-for="error in errors" class="text-danger">{{ error }}</li>
  </ul>
</template>

<script>
    export default {
        props: {
            errors: {type: Array, 'default': _ => []}
        }
    }
</script>