<template>
  <div class="gravatar">
    <img :src="url" alt="avatar" class="img-responsive img-thumbnail">
  </div>
</template>

<script>
  export default {
    props: {
      md5: {type: String, required: true},
      size: {type: Number, 'default': _ => 80},
      'default': {type: String, 'default': _ => 'mm'}
    },

    computed: {
      url () {
        let picture = `&d=${this.default}`
        if (this.default === 'gravatar') {
          picture = ''
        }

        return (
          `http://www.gravatar.com/avatar/${this.md5}?s=${this.size}${picture}`
        )
      }
    }
  }
</script>