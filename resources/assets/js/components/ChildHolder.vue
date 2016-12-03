<template>
  <div>
    <transition name="fade-horizontal" mode="out-in"
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>