<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="display: flex; flex-direction: column"
    >
      <el-form-item label="商家名称" prop="name">
        <el-input v-model="ruleForm.name" style="width: 800px"></el-input>
      </el-form-item>
      <el-form-item label="商家地址" prop="address">
        <el-input v-model="ruleForm.address" style="width: 800px"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone" style="width: 800px"></el-input>
      </el-form-item>
      <el-form-item label="营业时间" required>
        <el-time-select
          placeholder="起始时间"
          v-model="ruleForm.startTime"
          :picker-options="{
            start: '06:00',
            step: '00:15',
            end: '24:00',
          }"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="ruleForm.endTime"
          :picker-options="{
            start: '06:00',
            step: '00:15',
            end: '24:00',
            minTime: ruleForm.startTime,
          }"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="店铺特点" prop="type" style="width: 900px">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="新开店铺" name="type"></el-checkbox>
          <el-checkbox label="品牌保证" name="type"></el-checkbox>
          <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
          <el-checkbox label="准时达" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="商家简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="配送费" prop="transpertation">
        <el-input-number
          v-model="ruleForm.num1"
          style="width: 120px"
          controls-position="right"
          @change="handleNumberChange"
          :min="0"
          :max="1000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="起送价" prop="sendPrice">
        <el-input-number
          v-model="ruleForm.num2"
          style="width: 120px"
          controls-position="right"
          @change="handleNumberChange"
          :min="0"
          :max="1000"
        ></el-input-number>
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
  name: "AddShop",
  data() {
    return {
      addShopList: [],
      ruleForm: {
        name: "", //商家名称
        address: "", //商家地址
        phone: "", //手机号
        delivery: false,
        type: [],
        desc: "",

        num1: 1, //计数器的数字

        num2: 1, //配送费的数字
        //选择营业时间的起始时间
        startTime: "",
        endTime: "",
      },

      //表单验证的规则
      rules: {
        name: [
          { required: true, message: "请输入商家名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1到 8 个字符", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请选择商家地址", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请填写商家联系电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            // message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            // message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个店铺特点",
            trigger: "change",
          },
        ],

        desc: [{ message: "请填写店铺简介", trigger: "blur" }],
      },
    };
  },
  mounted() {
    //从LocalStorage读取地址列表
    if (localStorage.getItem("addShopList")) {
      this.addShopList = JSON.parse(localStorage.getItem("addShopList"));
    }
     //判断是否为路由跳转,如果是路由跳转过来的,表示是修改状态
    if (this.$route.query.addressObj) {
      this.ruleForm = this.$route.query.addressObj;
    }
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // const {ruleForm,addShopList} = this
        if (valid) {
          //通过表单验证

          //通过路由参数判断是修改还是新增
          if (this.$route.query.addressObj) {
            //路由跳转的,所以应该替换之前的地址对象,并存入localStorage
            let index = this.addShopList.findIndex(
              (item) => item.id === this.ruleForm.id
            );
            this.addShopList.splice(index, 1, this.ruleForm);
            localStorage.setItem(
              "addShopList",
              JSON.stringify(this.addShopList)
            );
            this.$message("修改成功");
            this.$router.push("/shop/updateShop");
          } else {
            //新增的,生成id,添加进地址数组,存入localStorage
            this.ruleForm.id = nanoid();
            this.addShopList.push(this.ruleForm);
            localStorage.setItem(
              "addShopList",
              JSON.stringify(this.addShopList)
            );
            this.$message("添加成功");
            this.$router.push("/shop/updateShop");
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
    //计数器中点击改变数字的方法
    handleNumberChange(value) {
      
      console.log(value);
    },
  },
};
</script>

<style lang = 'less' rel='stylesheet/less' scoped>
.demo-ruleForm {
  width: 900px;
  margin: 0 auto;
  padding-top: 40px;
}
el-form-item {
  width: 900px;
}
</style>
