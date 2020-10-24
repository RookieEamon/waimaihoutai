<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="地址名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="收货姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="收货手机" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        <el-select v-model="ruleForm.city" placeholder="请选择收货城市">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
          <el-option label="广州" value="广州"></el-option>
          <el-option label="深圳" value="深圳"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-input type="textarea" v-model="ruleForm.detail"></el-input>
      </el-form-item>
      <el-form-item label="地址类型">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="公司" name="type"></el-checkbox>
          <el-checkbox label="家庭" name="type"></el-checkbox>
          <el-checkbox label="学校" name="type"></el-checkbox>
          <el-checkbox label="其他" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址备注" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即{{ this.$route.query.addressObj ? "修改" : "创建" }}</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { nanoid } from "nanoid";
export default {
  name: "Address",
  data() {
    return {
      addressList: [],
      ruleForm: {
        title: "",//标题
        name: "",//姓名
        phone: "",//手机号
        city: "",//城市
        type: [],//类别
        sex: "",//性别
        desc: "",//备注
        detail: "",//详细信息
        id: null,//id
      },
      rules: {//表单验证规则
        name: [
          { required: true, message: "请输入收货姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        phone: [
          { required: true, message: "请填写手机", trigger: "change" },
          { min: 11, max: 11, message: "手机号长度不正确", trigger: "blur" },
        ],
        detail: [
          {
            type: "string",
            required: true,
            message: "详细地址必须填写",
            trigger: "change",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  methods: {
    //提交表单
    submitForm(formName) {
      //是否通过了所有的表单验证规则
      this.$refs[formName].validate((valid) => {
        //通过表单验证
        if (valid) {
          //通过路由参数判断是修改还是新增
          if (this.$route.query.addressObj) {
            //路由跳转的,所以应该替换之前的地址对象,并存入localStorage
            let index = this.addressList.findIndex(
              (item) => item.id === this.ruleForm.id
            );
            this.addressList.splice(index, 1, this.ruleForm);
            localStorage.setItem(
              "addressList",
              JSON.stringify(this.addressList)
            );
            this.$message("修改成功");
            this.$router.push("/cart/cartList");
          } else {
            //新增的,生成id,添加进地址数组,存入localStorage
            this.ruleForm.id = nanoid();
            this.addressList.push(this.ruleForm);
            localStorage.setItem(
              "addressList",
              JSON.stringify(this.addressList)
            );
            this.$message("添加成功");
            this.$router.push("/cart/cartList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    //从localStorage读取地址列表
    if (localStorage.getItem("addressList")) {
      this.addressList = JSON.parse(localStorage.getItem("addressList"));
    }
    // console.log(this.$route.query);
    //判断是否为路由跳转,如果是路由跳转过来的,表示是修改状态
    if (this.$route.query.addressObj) {
      this.ruleForm = this.$route.query.addressObj;
    }
  },
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
</style>