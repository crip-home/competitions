<template>
  <form @submit.prevent="submit" class="v-panel v-form-panel">
    <div class="panel panel-default">

      <div class="panel-heading clearfix">
        <div class="v-panel-title pull-left">{{ title }}</div>
        <div class="v-panel-title pull-right"><slot name="actions"></slot></div>
      </div>

      <div class="panel-body form-horizontal">
        <slot></slot>
      </div>

    </div>
  </form>
</template>

<script>
    export default {
        props: {
            title: {type: String, required: true},
            submit: {type: Function, required: true}
        }
    }
</script>