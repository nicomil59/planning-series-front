<template>
  <div>
    <router-view />
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    name: "app",
    components: {
    },
    computed: {
      ...mapGetters(['loggedIn'])
    },
  }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>