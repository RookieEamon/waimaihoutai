<template>
  <div class="searchShopContianer">
    <!-- 顶部标题框框 -->
    <div class="title">
      搜索商家
      <el-input
        placeholder="查找商户"
        v-model="shopKeyword"
        class="input-with-select"
        style="width: 50%; position: relative; top: -3px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          style="background: #3974e8; color: white"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <!-- 顶部的搜索商铺部分 -->
    <!-- <div class="searchContainer">
       <el-button slot="append" >点击查看全部商家</el-button>
      <el-input v-model= 'shopKeyword' placeholder="请输入关键词" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input> -->

    <!-- </div> -->

    <!-- 搜索后 展示商铺信息的部分 -->
    <div class="show">
      <div class="shopItem" v-for="(item,index) in shopList" :key="item.id">
        <img src="../imgs/01.jpg" alt="" />
        <!-- 信息展示区 -->
        <div class="content">
          <div>
            <span class="name contentItem">{{item.name}}</span>
            <p class="area">{{item.address}}</p>
            <div class="opentime">
              <span>营业时间</span> <span>{{item.opening_hours[0]}}</span>
            </div>
            <div class="price"><span>{{item.piecewise_agent_fee.tips}}</span></div>
            <div class="call"><span>联系商家:</span> <span>{{item.phone}}</span></div>
          </div>
          <div>
            <div class="location"><i></i><span>174801km</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "SearchShop",
  data() {
    return {
      shopKeyword: "", // 搜索时的关键字
    };
  },

  created() {
    //调用获取数据列表的函数
    // this.getGoodsList();
  },
  computed: {
    ...mapState({
      shopList:state=>state.searchShop.shopList
    })
  },
  methods: {
    search(){
      const geohash='31.22967,121.4762'
      const shopObj = {
        shopKeyword:this.shopKeyword,
        geohash
      }
      console.log(shopObj)
      this.$store.dispatch('shopListByKeyword',shopObj)
    }
  },
};
</script>

<style lang = 'less' rel='stylesheet/less' scoped>
/* 页面总容器 */
.searchShopContianer {
  display: flex;
  flex-direction: column;

  padding-top: 30px;
  padding-left: 30px;
  /* 顶部标题框 */
  .title {
    font-size: 30px;
    height: 50px;
    line-height: 50px;
    /* border-bottom: 1px solid black; */
    margin-bottom: 20px;
  }

  /* 搜索商铺部分 */
  .el-select .el-input {
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    width: 50% !important;
  }

  .searchContainer {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .searchItem {
      margin-right: 20px;
    }
    .searchInput {
      width: 300px;
    }
  }

  /* 商铺展示部分 */
  .show {
    background-color: antiquewhite;
    display: flex;
    flex-direction: column;
    //每条信息的外部容器
    .shopItem {
      display: flex;
      padding-top: 20px;
      padding-left: 20px;
      margin-bottom: 20px;
      background-color: white;
      align-items: center;
      img {
        width: 130px;
        height: 130px;
      }
      //信息展示区域
      .content {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        width: 800px;
        align-items: center;
        /* padding-left: 0; */

        /* 设置每条信息的通用样式 */
        .contentItem {
          width: 600px;
          margin-bottom: 15px;
          font-size: 16px;
        }
        /* 设置内容区商家名称的样式 */
        .name {
          font-size: 22px;
          padding-left: 0px;
        }
        .area {
          font-size: 14px;
          color: #6a6a6a;
        }
        .opentime {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
