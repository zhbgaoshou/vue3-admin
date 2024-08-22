<script setup lang="ts">
import DeleteIcon from "@/assets/svgs/delete.svg";
import EditIcon from "@/assets/svgs/edit.svg";
import SuccessIcon from "@/assets/svgs/success.svg";
import { ref, watch, nextTick } from "vue";

const props = defineProps(["room", "isEdit", "isAdd", "isActive"]);
const emit = defineEmits(["del", "edit", "openEdit", "add"]);

const inValue = ref(props.room.name);
const inputDOM = ref({} as HTMLInputElement);

watch(
  () => props.isEdit,
  () => {
    nextTick(() => {
      inputDOM.value.focus();
    });
  }
);

watch(
  () => props.isAdd,
  () => {
    nextTick(() => {
      inputDOM.value.focus();
    });
  },
  { immediate: true }
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
    class="w-full relative bg-slate-100 h-[50px] rounded-lg p-5px flex items-center justify-between my-[5px]"
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
      v-show="isEdit"
      v-model="inValue"
      class="ml-[5px]"
    />
    <div class="flex">
      <DeleteIcon
        v-show="!isEdit"
        class="stroke-slate-400 cursor-pointer"
        @click="$emit('del', room)"
      />
      <EditIcon
        v-show="!isEdit"
        class="stroke-slate-400 mx-[8px] cursor-pointer"
        @click="$emit('openEdit')"
      />
      <SuccessIcon
        v-show="isEdit"
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
