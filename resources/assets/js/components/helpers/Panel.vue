<template>
  <div class="v-panel">
    <div class="panel panel-default">

      <div class="panel-heading">
        <slot name="title"></slot>
      </div>

      <slot name="pre"></slot>

      <div class="panel-body">
        <slot></slot>
      </div>

      <slot name="footer"></slot>

    </div>
  </div>
</template>