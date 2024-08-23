<script setup lang="ts">
import DeleteIcon from "@/assets/svgs/delete.svg";
import EditIcon from "@/assets/svgs/edit.svg";
import SuccessIcon from "@/assets/svgs/success.svg";
import { ref, watch, nextTick } from "vue";

const props = defineProps(["room", "isEdit", "isAdd", "isActive"]);
const emit = defineEmits(["del", "edit", "openEdit", "add", "toggle-room"]);

const inValue = ref(props.room.name);
const inputDOM = ref({} as HTMLInputElement);

// 当 isEdit 或 isAdd 改变时，自动聚焦输入框
watch(
  [() => props.isEdit, () => props.isAdd],
  () => {
    nextTick(() => {
      inputDOM.value?.focus();
    });
  },
  {
    immediate: true,
  }
);

function addOrEdit() {
  if (props.isEdit) {
    emit("edit", props.room, inValue.value);
  }
  if (props.isAdd) {
    emit("add", inValue);
  }
}
</script>

<template>
  <div
    class="w-full relative bg-white h-[50px] rounded-lg p-5px flex items-center justify-between my-[5px]"
  >
    <!-- 文本信息 -->
    <div
      @click="emit('toggle-room', room)"
      class="h-full flex-1 items-center flex border-r-[1px] border-slate-200"
    >
      <div class="absolute top-[-2px]">
        <el-icon v-if="isActive" size="18">
          <CircleCheck class="text-lime-500" />
        </el-icon>
      </div>
      <p v-show="!isEdit" class="pl-[10px] flex-1 basis-0 text-slate-500">
        {{ room.name }}
      </p>
      <el-input
        ref="inputDOM"
        v-show="isEdit || isAdd"
        v-model="inValue"
        class="ml-[5px]"
      />
    </div>
    <!-- 按钮组 -->
    <div class="flex">
      <DeleteIcon
        v-show="!isEdit && !isAdd"
        class="stroke-slate-400 cursor-pointer ml-[8px]"
        @click="$emit('del', room)"
      />
      <EditIcon
        v-show="!isEdit && !isAdd"
        class="stroke-slate-400 mx-[8px] cursor-pointer"
        @click="$emit('openEdit', room)"
      />
      <SuccessIcon
        v-show="isEdit || isAdd"
        class="stroke-slate-400 mx-[8px] cursor-pointer"
        @click="addOrEdit"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
}
</style>
