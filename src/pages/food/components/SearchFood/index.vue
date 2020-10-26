<template>
  <div>
    <!-- 第一个卡片 -->
    <el-card class="box-card">
      <div class="text item">
        <!-- 商铺选择 -->
        <label>商铺</label>
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
        <label>商品分类列表</label>
        <el-select
          v-model="goodKingId"
          style="margin-left: 20px;margin-right:20px"
          placeholder="请选择">
          <el-option
            v-for="item in goodKingList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <!-- 根据商品分类列表获得商品列表 -->
        <label>商品列表</label>
        <el-select
          v-model="goodId"
          style="margin-left: 20px;margin-right:20px"
          placeholder="请选择">
          <el-option
            v-for="item in goodsObj.foods"
            :key="item.item_id"
            :label="item.name"
            :value="item.item_id">
          </el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
    </el-card>


    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="padding: 10px" class="el-icon-plus" type="primary">添加按钮</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        goodKingId:'',//商品分类id
        goodKingList:[],//商品分类列表

        goodId:'',//商品id
        goodsObj:{},//商品对象，其中的foods属性为商品列表
        goodDetail:{},//商品详情


        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
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
        this.getFoodCategoryList(val);  
      },

      //监视商品分类id的变化
      goodKingId:function (val) {
        this.getFoods(val)        
      },

      // 监视食品id变化
      goodId:function (val) {
        console.log(this.goodsObj.foods.find((item) => item.item_id === val));
        this.goodDetail = this.goodsObj.foods.find((item) => item.item_id === val);
        // this.getAppraise()
      },
    },

    methods: {
      // 根据城市信息获取商品列表
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
        let result = await reqFoodsByCategoryId(this.goodKingId);
        this.goodsObj = result;
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
       tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },

    mounted() {
      // 页面已加载先获取商铺列表
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

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
