<template>
  <div class="tab-pane v-tab" :class="{ active }" :id="id">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import Tabs from './index'
  import help from '../../../help'

  export default {
    name: 'tab',

    props: {
      'for': {type: Tabs, required: true},
      header: {type: String},
      onSelected: {type: Function, 'default': _ => _ => _},
      onDeselected: {type: Function, 'default': _ => _ => _}
    },

    mounted () {
      this.for.add(this)
    },

    data () {
      return {
        id: help.newGuid(),
        active: false
      }
    },

    methods: {
      /**
       * Deselect current tab
       */
      deselect () {
        this.active = false
        this.onDeselected()
      },

      /**
       * Mace current tab as active
       */
      select () {
        this.for.items.forEach(tab => tab.deselect())
        this.active = true
        this.onSelected()
      }
    }
  }
</script>