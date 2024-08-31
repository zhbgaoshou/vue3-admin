<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";

const $router = useRouter();
const $route = useRoute();
const { fetchLogin } = useUserStore();

const ruleFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (rule && value === "") {
    callback(new Error("Please input the password"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [
    { validator: validatePass, trigger: "blur" },
    { required: true, message: "非空", trigger: "blur" },
  ],
  username: [{ required: true, message: "非空", trigger: "blur" }],
});

const ruleForm = reactive({
  password: "123456",
  username: "芭德尔",
  image: "",
});

let isLoading = ref(false);
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      isLoading.value = true;
      await fetchLogin(ruleForm).finally(() => {
        isLoading.value = false;
      });
      $route.query.re
        ? $router.replace($route.query.re as string)
        : $router.replace("/");
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

function handleImageUpload(e: any) {
  const file = e.target.files[0];
  console.log(file);

}
</script>

<template>
  <el-card style="border-radius: 20px; box-shadow: none; background-color: transparent">
    <template #header>
      <div class="card-header">
        <span>REGISTER</span>
      </div>
    </template>

    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto">
      <!-- 头像上传 -->
      <el-form-item label="头像" prop="avatar" class="flex items-center">
        <div class=" bg-white rounded-full shadow-sm  w-[32px] h-[32px] overflow-hidden ">
          <input type="file" class=" opacity-0" @change="handleImageUpload">
        </div>
        <el-icon class="mx-[5px]">
          <component is="InfoFilled"></component>
        </el-icon>
        <span class=" text-slate-300 text-xs">
          点击圆圈上传，也可不传
        </span>
      </el-form-item>

      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm(ruleFormRef)" loading-icon="Eleme" :loading="isLoading"
        round>注册</el-button>
      <el-button round @click="resetForm(ruleFormRef)">重置</el-button>
    </template>
  </el-card>
</template>

<style scoped></style>
