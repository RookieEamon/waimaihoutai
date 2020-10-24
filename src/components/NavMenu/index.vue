<template>
  <div class="container">
    <img
      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1224998970,99441820&fm=26&gp=0.jpg"
      width="252px"
    />
    <div class="nav">
      <el-row class="tac">
        <el-col :span="4">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商铺管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">搜索商铺</el-menu-item>
                <el-menu-item index="1-2">增加商铺</el-menu-item>
                <el-menu-item index="1-3">修改商铺</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-burger"></i>
                <span>食品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/food/searchfood">搜索食品</el-menu-item>
                <el-menu-item index="/food/addfoodtype">增加食品类型</el-menu-item>
                <el-menu-item index="/food/updatefoodinfo">修改食品信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-shopping-cart-full"></i>
                <span>购物车</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/cart/cartList">购物车列表</el-menu-item>
                <el-menu-item index="/cart/addGood">添加商品</el-menu-item>
                <el-menu-item index="/cart/address">地址信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavMenu",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.container {
  position: relative;
  .logo {
    width: 252px;
  }
  .breadcrumb {
    position: absolute;
    top: 70px;
    left: 300px;
  }
}
</style>