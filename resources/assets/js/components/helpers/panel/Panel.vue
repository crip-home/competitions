<template>
  <div class="v-panel">
    <div class="panel panel-default">

      <div class="panel-heading clearfix">
        <div class="v-panel-title pull-left">
          <slot name="title"></slot>
        </div>
        <div class="v-panel-title pull-right">
          <slot name="actions"></slot>
        </div>
      </div>

      <slot name="pre"></slot>

      <div class="panel-body">
        <slot></slot>
      </div>

      <slot name="footer"></slot>

    </div>
  </div>
</template>