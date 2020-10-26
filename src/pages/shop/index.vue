<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Shop",
};
</script>

<style lang = 'less' rel='stylesheet/less' scoped>
.container {
  height: 660px;
  width: 1200px;
  background-color: rgba(204, 204, 204, 0.5);
  position: absolute;
  top: 107px;
  left: 270px;
}
</style>
