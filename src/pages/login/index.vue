<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      hide-required-asterisk
    >
      <el-form-item label="用户名" prop="username">
        <el-input 
          v-model="ruleForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Button, Select } from "element-ui";
export default {
  name: "Login",
  components: {
    Button,
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: "success",
            message: "登录成功",
          });
          localStorage.setItem("USERTOKEN", this.ruleForm.username);
          this.$router.push("/shop");
          location.reload()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted(){
    if(localStorage.getItem('USERTOKEN')){
      this.$router.push('/shop')
    }
  }
};
</script>
<style lang='less' rel='stylesheet/less' scoped>
.demo-ruleForm {
  width: 350px;
  height: 150px;
  margin: 100px auto;
  // border: 1px solid #000;
  background-color: #ccc;
  border-radius: 20px;
  padding: 80px 0;
  position: relative;
  padding-right:50px ;
  .login{
    margin-left: 70px;
  }

}
</style>