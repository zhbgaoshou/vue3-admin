<script setup lang="ts">
import { ref, computed } from "vue";

import SelectorModelCard from "./SelectorModelCard.vue";

import useChatStore from "@/store/modules/chat";

const chatStore = useChatStore();

const emit = defineEmits(["send", "file", "goto-bottom", "stop-fetch"]);
const props = defineProps(["role", "content", "isGotoBottom", "isGeneration"]);
const input = ref("");
const textareaStyle = {
  "box-shadow": "none",
  "border-radius": "0px",
  "padding-bottom": "20px",
};

const icons = computed(() => [
  { name: "FolderAdd", class: "" },
  {
    name: props.isGeneration ? "SwitchButton" : "Position",
    class: props.isGeneration
      ? "!bg-slate-200 hover:shadow-none cursor-pointer "
      : "",
  },
]);

function clickIcon(iconName: string) {
  switch (iconName) {
    case "Position":
      emit("send", input);
      break;
    case "SwitchButton":
      emit("stop-fetch");
      break;
  }
}

function changeFile(e: Event) {
  const el = e.target as HTMLInputElement;
  emit("file", el.files);
}

let isShowPopover = ref(false);
function handleToggleModel(model: string) {
  chatStore.toggleModel(model);
  isShowPopover.value = false;
}
</script>

<template>
  <div class="flex flex-col bg-stone-50 rounded-md">
    <!-- 顶部 -->
    <div class="flex justify-between h-full m-[10px] relative">
      <!-- 警告 -->
      <div class="flex items-center">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <!-- start选择model -->
        <el-popover
          placement="top"
          :hide-after="0"
          trigger="click"
          width="max-content"
          popper-class="!rounded-[20px] w-max-[100%]"
          :visible="isShowPopover"
        >
          <template #reference>
            <p
              @click="isShowPopover = !isShowPopover"
              class="mx-[5px] text-black font-bold text-sm flex items-center cursor-pointer"
            >
              {{ chatStore.fetchModel.name }}
              <el-icon class="mx-[3px]">
                <component is="ArrowUpBold"></component>
              </el-icon>
            </p>
          </template>

          <SelectorModelCard
            @toggle-model="handleToggleModel"
            v-for="model in chatStore.modelList"
            :key="model.value"
            :model="model"
          />
        </el-popover>
        <!-- end选择model -->
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
          :color="icon.name === 'SwitchButton' ? '#ef4444' : ''"
          v-for="icon in icons"
          size="34"
          :class="icon.class"
          class="icon-style"
        >
          <component :is="icon.name" class="p-[5px]"></component>
          <input
            v-show="icon.name === 'FolderAdd'"
            class="w-full h-full absolute opacity-0"
            type="file"
            @change="changeFile"
          />
        </el-icon>
      </div>
    </div>
    <!-- 输入框textarea -->
    <el-input
      v-model="input"
      show-word-limit
      type="textarea"
      placeholder="请输入内容"
      :input-style="textareaStyle"
      :autosize="{ minRows: 2, maxRows: 10 }"
      resize="none"
      :maxlength="400"
    />
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  --el-card-padding: 5px;
}
</style>
