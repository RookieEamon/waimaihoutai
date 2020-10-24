<template>
  <div>
    <div class="select">
      <!-- 商铺信息选择 -->
      <div>
        <span style="margin-right: 20px">选择商铺:</span>
        <el-select v-model="restaurantId" placeholder="请选择餐厅">
          <!-- <span class="chooseGood">请选择餐厅</span> -->
          <el-option
            v-for="item in restaurantList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
          <span @click="loadMoreRestaurant" class="loadMoreRestaurant"
            >点击加载更多商铺..</span
          >
        </el-select>
      </div>
        <!-- 根据商铺获得的商品分类信息 -->
      <div>
        <span style="margin-right: 20px">选择食品分类:</span>
        <el-select v-model="goodKindId" placeholder="请选择食品分类">
          <el-option
            v-for="item in goodKindList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </div>
        <!-- 根据商品分类信息获得的商品信息 -->
      <div>
        <span style="margin-right: 20px">选择食品:</span>
        <el-select v-model="goodId" placeholder="请选择食品">
          <el-option
            v-for="item in goodsObj.foods"
            :key="item.item_id"
            :value="item.item_id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>美食详情:</span>
          </div>
          <span v-if="!goodDetail._id" class="image">唯有美食不可辜负</span>
          <img
            v-else
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <!-- <img :src="goodDetail.image_path" class="image"> -->
          <div style="padding: 14px">
            <span>{{ goodDetail.description || "" }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ goodDetail.tips || "" }}</time>
              <el-button type="text" class="button" v-if="goodDetail._id">添加至购物车</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="appraise">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户评价:</span>
          </div>
          <div v-for="item in appraiseList" :key="item._id" class="text item">
            {{ item.name}}X{{item.count}}次
          </div>
          <div class="text item" v-if="goodDetail._id">
            ......
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import {
  reqRestaurantsByLocation,
  reqFoodListByRestaurantId,
  reqFoodsByCategoryId,
  reqAppraiseByRestaurantId
} from "@/api";
import { mapState } from "vuex";
export default {
  name: "AddGood",
  data() {
    return {
      restaurantList: [], //商铺列表
      restaurantId: "", //商铺id
      resuaurantnum: 5, //商铺显示数量
      goodKindId: "", //商品分类id
      goodKindList: [], //商品分类id
      goodId: "", //商品id
      goodsObj: {}, //商品对象,其中的foods属性为商品列表
      goodDetail: {}, //商品详情
      appraiseList:[]//评价列表
    };
  },
  computed: {
    //将城市信息映射到计算属性
    ...mapState({
      cityInfo: (state) => state.home.cityInfo,
    }),
  },
  watch: {
    //监视商铺id的变化
    restaurantId: function (val) {
      //   console.log(val);
      this.getFoodKindList(val);
    },
    //监视商品分类id的变化
    goodKindId: function (val) {
      //   console.log(val);
      this.getFoods(val);
    },
    //监视食品id变化
    goodId: function (val) {
      console.log(this.goodsObj.foods.find((item) => item.item_id === val));
      this.goodDetail = this.goodsObj.foods.find(
        (item) => item.item_id === val
      );
      this.getAppraise()
    },
  },
  methods: {
    //根据城市信息获取商品列表
    async getRestaurants() {
      let result = await reqRestaurantsByLocation(
        this.cityInfo.longitude,
        this.cityInfo.latitude,
        this.resuaurantnum
      );
      // console.log(result);
      this.restaurantList = result;
    },
    //点击加载更多商铺
    loadMoreRestaurant() {
      this.resuaurantnum += 5;
      this.getRestaurants();
    },
    //根据商铺id获取商品分类
    async getFoodKindList() {
      let result = await reqFoodListByRestaurantId(this.restaurantId);
      // console.log(result);
      this.goodKindList = result;
    },
    //根据商品分类id获取食品列表
    async getFoods() {
      let result = await reqFoodsByCategoryId(this.goodKindId);
      this.goodsObj = result;
      // console.log(result);
    },
    //获取评价
    async getAppraise(){
      let result = await reqAppraiseByRestaurantId(this.restaurantId)
      console.log(result);
      this.appraiseList=result
    }
  },
  mounted() {
    //一进来先获取商铺列表
    this.getRestaurants();
    // console.log(this.goodDetail._id);
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.select {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  .loadMoreRestaurant {
    font-size: 15px;
    color: pink;
    margin-left: 15px;
  }
  .chooseGood {
    color: pink;
    font-size: 15px;
    margin-left: 15px;
  }
}
//卡片的样式
.cards {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  .card {
    width: 400px;
    // height: 300px;
    // margin: 100px 100px;
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }
  }
  .appraise {
    width: 400px;
    height: 600px;
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
      text-align: center;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }

    .box-card {
      width: 400px;
      height: 536px;
    }
  }
}
</style>