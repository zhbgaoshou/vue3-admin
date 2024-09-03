<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";

const { fetchRegister } = useUserStore();
const activeTab = defineModel("activeTab");

const ruleFormRef = ref<FormInstance>();
let imgSrc = ref("");

// 验证数据
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [
    { required: true, message: "非空", trigger: "blur" },
    { min: 6, message: "密码不能小于6位", trigger: "blur" },
  ],
  username: [{ required: true, message: "非空", trigger: "blur" }],
});

interface userParams {
  username: string;
  password: string;
  image?: any;
}
const ruleForm: userParams = reactive({
  password: "",
  username: "",
  image: null,
});

// 注册提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const formData = new FormData();
      if (!ruleForm.image) {
        delete ruleForm.image;
      }
      (Object.keys(ruleForm) as Array<keyof typeof ruleForm>).forEach((key) => {
        formData.append(key, ruleForm[key] as Blob | "");
      });
      try {
        await fetchRegister(formData);
        activeTab.value = "login";
      } catch (error) {
        ElMessage({
          type: "error",
          message: "注册失败，用户名重复",
        });
      }
    } else {
      console.log("error submit!");
    }
  });
};

function handleImageUpload(e: any) {
  const file = e.target.files[0];
  // 检查文件是否是图片类型
  const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  if (!validImageTypes.includes(file.type)) {
    ElMessage({
      message: "请上传有效的图片文件JPEG, PNG,GIF,JPG。",
      type: "warning",
    });
    return;
  }
  // 检查文件大小是否超过5MB
  const maxSizeInMB = 5;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    ElMessage({
      message: "文件大小不能超过5MB。",
      type: "warning",
    });
    return;
  }
  // 图片预览
  const reader = new FileReader();
  reader.onload = function (e) {
    imgSrc.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
  ruleForm.image = file;
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  imgSrc.value = "";
  formEl.resetFields();
};
</script>

<template>
  <el-card
    style="border-radius: 20px; box-shadow: none; background-color: transparent"
  >
    <template #header>
      <div class="card-header">
        <span>REGISTER</span>
      </div>
    </template>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
    >
      <!-- 头像上传 -->
      <el-form-item label="头像" prop="avatar" class="flex items-center">
        <div
          v-show="!imgSrc"
          class="bg-white rounded-full shadow-sm w-[32px] h-[32px] overflow-hidden"
        >
          <input type="file" class="opacity-0" @change="handleImageUpload" />
        </div>
        <!-- 预览 -->
        <img
          v-show="imgSrc"
          :src="imgSrc"
          class="w-[32px] h-[32px] object-cover rounded-full"
        />
        <!-- 预览end -->
        <el-icon class="mx-[5px]">
          <component is="InfoFilled"></component>
        </el-icon>
        <span class="text-slate-300 text-xs"> 点击圆圈上传，也可不传 </span>
      </el-form-item>

      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="new-password"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
        loading-icon="Eleme"
        round
        >注册</el-button
      >
      <el-button round @click="resetForm(ruleFormRef)">重置</el-button>
    </template>
  </el-card>
</template>

<style scoped></style>
