<template>
  <div class="v-tabs">

    <ul class="nav nav-tabs">
      <li v-for="tab in tabs.items" :id="`for-${tab.id}`">
        <a :href="`#${tab.id}`" @click.prevent="tab.select()">{{ tab.header }}</a>
      </li>
    </ul>

    <div class="tab-content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  import Tabs from './index'

  export default {
    props: {
      tabs: {type: Tabs, required: true}
    }
  }
</script>