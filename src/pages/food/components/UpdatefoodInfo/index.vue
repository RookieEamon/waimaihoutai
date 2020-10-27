<template>
  <div>
   <!-- 修改食品信息 -->
    <el-card class="box-card">    
        <el-form
          label-width="100px" 
          class="demo-ruleForm"
        >
          <el-form-item label="商家名称" prop="restaurantName">
            <el-input v-model="restaurantName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" prop="categoryName">
            <el-input v-model="categoryName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="食品名称" prop="name">
            <el-input v-model="foodObj.name"></el-input>
          </el-form-item>
          <el-form-item label="食品描述" prop="description">
            <el-input v-model="foodObj.description"></el-input>
          </el-form-item>
          <el-form-item label="销量和评价" prop="tips">
            <el-input v-model="foodObj.tips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="update">确定</el-button>
          </el-form-item>
        </el-form>
    </el-card> 

  </div>
</template>

<script>
export default {
  name: 'UpdatefoodInfo',
   data() {
      return {
         foodObj:{},
         restaurantName:'',
         categoryName:''
      }
    },

    beforeMount() {
      if (!this.$route.query.foodObj) {
        this.$message('请先选择商家，再修改')
        this.$router.push('/food/searchfood')  
      }
    },
    // 接受从SearchFood传过来的数据
    mounted() {
      // console.log(this.$route.query);
      this.foodObj = this.$route.query.foodObj
      this.restaurantName = this.$route.query.restaurantName
      this.categoryName = this.$route.query.categoryName
    },

    methods: {
      // 确定修改
      update(){
        localStorage.setItem("updateList",this.restaurantName + this.categoryName + this.foodObj.name + this.foodObj.description)
        this.$message('修改成功')
      }
    },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>

</style>
