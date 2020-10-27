<template>
<div class="container">
    <router-view></router-view>
</div>
</template>
<script>
  export default {
    name: 'Cart',
  }
</script>
<style lang='less' rel='stylesheet/less' scoped>
 .container{
   padding: 20px;
    //  height: 960px;
     width: 1200px;
     background-color: rgba(204, 204, 204,.5);
     position: absolute;
     top: 107px;
     left: 270px;
 }
</style>