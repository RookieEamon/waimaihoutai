<template>
  <div class="container">
    <img
      src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1224998970,99441820&fm=26&gp=0.jpg"
      width="252px"
    />
    <div class="nav">
      <el-row class="tac">
        <el-col :span="4">
          <!-- 
            default-openeds默认展开的
            router路由匹配
            default-active = "path"根据path的值匹配高亮
            path的值可以写在计算属性中
           -->
          <el-menu
            :default-openeds="['1', '2', '3']"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :default-active="path"
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
                <el-menu-item index="2-1">搜索食品</el-menu-item>
                <el-menu-item index="2-2">增加食品类型</el-menu-item>
                <el-menu-item index="2-3">修改食品信息</el-menu-item>
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
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{
          this.$route.meta.categoryTitle
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="city">
      <el-dropdown @command="changeCity">
        <span class="el-dropdown-link">
          <i class="el-icon-location"></i>{{cityInfo.name}} 切换城市<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command='item' v-for="item in cityList" :key="item.id">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {reqCityList} from '@/api'
export default {
  name: "NavMenu",
  data() {
    return {
      cityList:[]
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    cityInfo(){
      return this.$store.state.home.cityInfo
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getCityList(){
      let result = await reqCityList()
      this.cityList = result
    },
    changeCity(city){
      this.$store.commit("changeCityMutatin",city)
    }
  },
  mounted(){
    this.getCityList()
  }
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
  .city{
    position: absolute;
    right: 200px;
    top: 50px;
  }
}
</style>