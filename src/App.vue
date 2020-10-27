<template>
  <div id="app">
    <NavMenu v-show="path !== '/login'" />
    <router-view></router-view>
  </div>
</template>

<script>
// import moduleName from 'module'
export default {
  name: "App",
  components: {},
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style>
body {
  background-color: #eee;
}
</style>
