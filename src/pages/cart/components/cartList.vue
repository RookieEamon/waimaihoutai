<template>
  <div>
    <!-- 食品列表表格 -->
    <div class="goods">
      <div class="title">
        <h2>已选食品</h2>
        <el-button type="success" @click="buyIt" v-if="cartList.length > 0"
          >确认下单</el-button
        >
      </div>
      <el-table :data="cartList" border style="width: 100%" height="390">
        <el-table-column fixed prop="restaurantName" label="商家名" width="150">
        </el-table-column>
        <el-table-column prop="categoryName" label="食品类别" width="200">
        </el-table-column>
        <el-table-column prop="name" label="食品名" width="550">
        </el-table-column>
        <el-table-column prop="tips" label="销量" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteFood(scope)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 地址列表表格 -->
    <div class="address">
      <div class="title">
        <h2>已选择地址:{{ address.title }}</h2>
        <el-button
          type="success"
          class="el-icon-circle-plus"
          @click="addAddress"
          >新增地址</el-button
        >
      </div>
      <el-table :data="addressList" border style="width: 100%" height="390">
        <el-table-column fixed prop="title" label="地址名" width="150">
        </el-table-column>
        <el-table-column fixed prop="city" label="城市" width="150">
        </el-table-column>
        <el-table-column prop="name" label="收货人" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="type" label="地址类型" width="100">
        </el-table-column>
        <el-table-column prop="detail" label="详细地址" width="500">
        </el-table-column>
        <el-table-column prop="desc" label="备注" width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="chooseAddress(scope)" type="text" size="small">
              选择
            </el-button>
            <el-button @click="deleteAddress(scope)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="changeAddress(scope)" type="text" size="small"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartList",
  data() {
    return {
      cartList: [], //购物车列表
      addressList: [], //地址列表
      address: {}, //已选择的地址
    };
  },
  methods: {
    //删除一个食品
    deleteFood(scop) {
      if (confirm("确认删除该商品吗?")) {
        this.cartList.splice(scop.$index, 1);
        localStorage.setItem("cartList", JSON.stringify(this.cartList));
      }
    },
    //选择一个地址
    chooseAddress(scope) {
      let address = this.addressList[scope.$index];
      this.address = JSON.parse(JSON.stringify(address));
    },
    //删除一个地址
    deleteAddress(scope) {
      if (confirm("确认删除该地址吗?")) {
        if (scope.row.id === this.address.id) {
          this.address = {};
        }
        this.addressList.splice(scope.$index, 1);
        localStorage.setItem("addressList", JSON.stringify(this.addressList));
      }
    },
    //修改地址,query参数为点击的地址对象路由跳转
    changeAddress(scope) {
      // console.log(scope);
      this.$router.push({
        path: "/cart/address",
        query: { addressObj: scope.row },
      });
    },
    //确认下单
    buyIt() {
      //判断是否选择了地址
      if (!this.address.title) {
        this.$alert("请先选择收货地址");
        return;
      }
      this.$confirm(
        `收货地址${this.address.title},商品数量:${this.cartList.length}`,
        "确认订单",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: `下单成功`,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `取消下单`,
          });
        });
    },
    //点击新增地址的回调
    addAddress() {
      this.$router.push("/cart/address");
    },
  },
  mounted() {
    //从localStorage中读取购物车列表和地址列表,设置默认第一个地址被选中
    if (localStorage.getItem("addressList")) {
      this.addressList = JSON.parse(localStorage.getItem("addressList"));
      this.address = this.addressList[0];
    }
    if (localStorage.getItem("cartList")) {
      this.cartList = JSON.parse(localStorage.getItem("cartList"));
    }
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.goods {
  .title {
    display: flex;
    justify-content: space-between;
  }
}
.address {
  margin-top: 15px;
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>