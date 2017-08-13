<template>
  <transition-group tag="div" id="toast-container" name="toast" :class="toastClass">
    <div v-for="(toast, index) in toasts" class="toast" :class="toast.class" :key="index">
      <button type="button" class="toast-close-button" @click.prevent="remove(index)">×</button>
      <div class="toast-message">{{ toast.message }}</div>
    </div>
  </transition-group>
</template>

<script>
  export default {
    computed: {
      toastClass () {
        // class should be configurable
        return ['toast-top-left']
      },

      toasts () {
        return this.$store.state.toast.toasts
      }
    },

    methods: {
      remove (index) {
        this.$store.commit('removeToast', {index})
      }
    }
  }
</script>

<style>
  #toast-container {
    position: fixed;
    z-index: 999999;
    pointer-events: none;
  }

  .toast-top-right {
    top: 12px;
    right: 12px;
  }

  .toast-top-left {
    top: 12px;
    left: 12px;
  }

  .toast-bottom-left {
    bottom: 12px;
    left: 12px;
  }

  .toast-bottom-right {
    right: 12px;
    bottom: 12px;
  }

  #toast-container > .toast {
    position: relative;
    pointer-events: auto;
    overflow: hidden;
    margin: 0 0 6px;
    padding: 15px;
    width: 400px;
    border-radius: 3px;
    box-shadow: 0 0 12px #999;
    color: #fff;
    opacity: .8;
    filter: alpha(opacity=80);
  }

  .toast {
    background-color: #030303;
  }

  .toast-success {
    background-color: #51a351;
  }

  .toast-error {
    background-color: #bd362f;
  }

  .toast-warning {
    background-color: #f89406;
  }

  .toast-info {
    background-color: #2f96b4;
  }

  .toast-close-button {
    outline: none !important;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    position: relative;
    float: right;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 0 #fff;
    opacity: .8;
    line-height: 1;
  }

  .toast-enter-active, .toast-leave-active {
    transition: all .3s ease;
  }

  .toast-enter, .toast-leave-active {
    opacity: 0;
    transform: translateY(-60px);
  }

  .toast-leave-active {
    opacity: 0;
  }
</style>