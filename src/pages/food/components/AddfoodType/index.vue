<template>
  <div>
    <!-- 第一个卡片 -->
    <el-card class="box-card">
    <div class="text item">   
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商家名称" prop="shopname">
          <el-input v-model="ruleForm.shopname"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" prop="category">
          <el-input v-model="ruleForm.category"></el-input>
        </el-form-item>
        <el-form-item label="食品名称" prop="foodname">
          <el-input v-model="ruleForm.foodname"></el-input>
        </el-form-item>
        <el-form-item label="食品描述" prop="desc">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-card>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: 'AddFood',
   data() {
      return {
        ruleForm: {
          shopname: '',//商家名称
          category: '',//食品分类
          foodname: '',//食品名称
          desc: ''//食品描述
        },
        rules: {
          shopname: [
            { required: true, message: '请输入商家名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请输入食品分类', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          foodname: [
            { required: true, message: '请输入食品名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入食品描述', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        foodList:[]
      };
    },
    mounted() {
      if(localStorage.getItem('foodList')){
        this.foodList = JSON.parse(localStorage.getItem('foodList'))
      }
    },
    methods: {
      // 提交表单
      submitForm(formName) {
        //是否通过所有的表单验证规则
        this.$refs[formName].validate((valid) => {
          // 通过表单验证
          if (valid) {
            // console.log(foodList);
            this.ruleForm.id = nanoid()
            this.foodList.push(this.ruleForm)
            localStorage.setItem("foodList",JSON.stringify(this.foodList))
            // alert('添加成功');
            this.$router.push('/food/searchfood')
            this.$message('添加成功')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }

</style>
