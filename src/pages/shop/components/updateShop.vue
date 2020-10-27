<template>
  <div>
    <div class="title">商家列表</div>
    <el-table
      :data="addShopList"
      height="250"
      border
      style="width: 95%; margin: 0 auto"
    >
      <el-table-column prop="name" label="商家名称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="180">
      </el-table-column>
      <el-table-column prop="address" label="详细地址"></el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="changeShop(scope)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteShop(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UpdateShop",
  data() {
    return {
      addShopList: [], //商家列表
      shop: {}, //已经选择的商家

      //表格中的数据
      tableData: [],
    };
  },

  mounted() {
    //
    if (localStorage.getItem("addShopList")) {
      this.addShopList = JSON.parse(localStorage.getItem("addShopList"));
      this.shop = this.addShopList[0];
    }
  },
  methods: {
    //编辑商家,query参数为点击的地址对象路由跳转
    changeShop(scope) {
      // console.log(scope);
      this.$router.push({
        path: "/shop/addShop",
        query: { addressObj: scope.row },
      });
    },

    //删除一个商家
    deleteShop(scope){
      if (confirm("确认删除该商家信息吗?")) {
        if (scope.row.id === this.shop.id) {
          this.shop = {};
        }
        this.addShopList.splice(scope.$index, 1);
        localStorage.setItem("addShopList", JSON.stringify(this.addShopList));
      }
    }
  },
};
</script>

<style lang = 'less' rel='stylesheet/less' scoped>
.title {
  font-size: 30px;
  padding: 20px;
  padding-left: 30px;
}
</style>
