<script setup lang="ts">
import { ref, computed } from "vue";
import { defaultModel } from "@/config/chat";

const emit = defineEmits(["send", "file", "goto-bottom"]);
const props = defineProps(["role", "content", "isGotoBottom", "isGeneration"]);
const input = ref("");

const icons = computed(() => [
  { name: "FolderAdd", class: "" },
  {
    name: "Microphone",
    class: "",
  },
  {
    name: props.isGeneration ? "SwitchButton" : "Position",
    class: props.isGeneration
      ? "bg-slate-300 hover:shadow-none cursor-not-allowed"
      : "",
  },
]);

function clickIcon(iconName: string) {
  switch (iconName) {
    case "Position":
      emit("send", input);
      break;
  }
}

function changeFile(e: Event) {
  const el = e.target as HTMLInputElement;
  emit("file", el.files);
}
</script>

<template>
  <div class="flex flex-col bg-stone-100 rounded-md">
    <div class="flex justify-between h-full m-[10px] relative">
      <!-- 警告 -->
      <div class="flex items-center">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <p class="mx-[5px] text-slate-400 font-bold text-sm">
          当前模型:{{ defaultModel }}
        </p>
      </div>
      <!-- 回到底部 -->
      <div
        @click="$emit('goto-bottom', 'input-trigger')"
        v-show="isGotoBottom"
        class="absolute top-[-100px] right-0 rounded-full bg-white shadow-md p-[9px] cursor-pointer"
      >
        <el-icon :size="28">
          <Download />
        </el-icon>
      </div>
      <!-- 图标 -->
      <div class="flex items-center relative">
        <el-icon
          @click="clickIcon(icon.name)"
          v-for="icon in icons"
          size="34"
          :class="icon.class"
          class="mx-[2px] rounded-[10px] bg-white cursor-pointer hover:shadow-md border-[1px]"
        >
          <component :is="icon.name" class="p-[5px]"></component>
        </el-icon>
        <input
          class="w-[40px] h-[40px] absolute opacity-0"
          type="file"
          @change="changeFile"
        />
      </div>
    </div>

    <el-input
      v-model="input"
      type="textarea"
      placeholder="请输入内容"
      :input-style="{
        'box-shadow': 'none',
        'border-radius': '0px',
        'padding-bottom': '20px',
      }"
      :autosize="{ minRows: 2, maxRows: 10 }"
      resize="none"
    />
  </div>
</template>
