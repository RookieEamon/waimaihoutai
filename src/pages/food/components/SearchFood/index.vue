<template>
  <div>
    <!-- 第一个卡片 -->
    <el-card class="box-card">
      <div class="text item">
        <!-- 商铺选择 -->
        <label>商家名称</label>
        <el-select 
          v-model="restaurantId" 
          placeholder="请选择"
          style="margin-left: 20px;margin-right:20px"
        >
          <el-option
            v-for="item in restaurantList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
          <span @click="loadMoreRestaurant" class="loadMoreRestaurant">点击加载更多...</span>
        </el-select>

        <!-- 根据商铺获得的商品分类列表 -->
        <label>食品分类列表</label>
        <el-select
          v-model="goodCategoryId"
          style="margin-left: 20px;margin-right:20px"
          placeholder="请选择">
          <el-option
            v-for="item in goodCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>     
        <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
      </div>
    </el-card>

    <!-- 第二个卡片 -->
    <!-- 根据商品分类列表获得商品列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="padding: 10px" class="el-icon-plus" type="primary" @click="addFood">添加按钮</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="goodsObj.foods"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="食品名称">
          </el-table-column>
          <el-table-column
            prop="description"
            label="食品描述">
          </el-table-column>
          <el-table-column
            prop="tips"
            label="销量和评价">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope)">修改</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
  </el-card>
  </div>
</template>

<script>

import {
  reqRestaurantsByLocation,
  reqFoodListByRestaurantId,
  reqFoodsByCategoryId,
  reqAppraiseByRestaurantId 
} from '@/api'

import { mapState } from 'vuex'

export default {
  name: 'SearchFood',
   data() {
      return {
        restaurantId:'',//商铺id
        restaurantList:[],//商铺列表
        resuaurantnum:5,//商铺显示数量

        goodCategoryId:'',//商品分类id
        goodCategoryList:[],//商品分类列表

        goodId:'',//商品id
        goodsObj:{},//商品对象，其中的foods属性为商品列表
        goodDetail:{},//商品详情
      }
    },

    computed: {
      // 将城市信息映射到计算属性
      ...mapState({
        cityInfo:(state) => state.home.cityInfo,
      })
    },

    watch:{
      //监视商铺id的变化
      restaurantId:function(val) {
        this.restaurantName = this.restaurantList.find((item) => item.id ===val).name;
        this.getFoodCategoryList(val);  
      },

      //监视食品分类id的变化
      goodCategoryId:function (val) {
        this.categoryName = this.goodCategoryList.find((item) => item.id === val).name;
        this.getFoods(val)        
      },

      // 监视食品id变化
      goodId:function (val) {
        // console.log(this.goodsObj.foods.find((item) => item.item_id === val));
        this.goodDetail = this.goodsObj.foods.find((item) => item.item_id === val);
      },
    },

    methods: {
      // 根据城市信息获取商家列表
      async getRestaurants(){
        let result = await reqRestaurantsByLocation(
          this.cityInfo.longitude,
          this.cityInfo.latitude,
          this.resuaurantnum
        );
        this.restaurantList = result;
      },

      // 点击加载更多商铺
      loadMoreRestaurant(){
        this.resuaurantnum += 5;
        this.getRestaurants();
      },

      // 根据商铺id获取商品分类
      async getFoodCategoryList(){
        let result = await reqFoodListByRestaurantId(this.restaurantId)
        this.goodCategoryList = result;
      },

      // 根据商品分类id获取食品列表
      async getFoods(){
        let result = await reqFoodsByCategoryId(this.goodCategoryId);
        this.goodsObj = result;
      },

      // 添加食品
      addFood(){
        this.$router.push('/food/addfoodtype')
      },

      // 修改当前行食品信息
      handleEdit(scope) {
        // console.log(scope)
        // query传参
        this.$router.push({
          path:'/food/updatefoodinfo',
          query:{foodObj:scope.row,restaurantName:this.restaurantName,categoryName:this.categoryName}
        })
      },

      // handleDelete(index, row) {
      //   console.log(index, row);
      // }
    },

    mounted() {
      // 页面已加载先获取商家列表
      this.getRestaurants();
    },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }

  .loadMoreRestaurant{
    padding: 10px 100px 10px 20px;
    font-size: 14px;
    line-height: 14px;
    margin-left: 150x;
    color: pink;
  }
  .loadMoreRestaurant:hover{
    background: #ccc;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
