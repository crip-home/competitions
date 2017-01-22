<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">

        <!-- Collapsed Hamburger -->
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                data-target="#app-navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <!-- Branding Image -->
        <slot></slot>
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">

        <!-- Left Side Of Navbar -->
        <navbar-items v-if="leftMenu.length > 0" :items="leftMenu" class="nav navbar-nav"></navbar-items>

        <!-- Right Side Of Navbar -->
        <navbar-items v-if="rightMenu.length > 0" :items="rightMenu" class="nav navbar-nav navbar-right"></navbar-items>

      </div>

    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',

    props: {
      leftMenu: {type: Array, 'default': () => []},
      rightMenu: {type: Array, 'default': () => []}
    }
  }
</script>