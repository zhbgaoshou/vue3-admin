<script setup lang="ts">
import { ref, watch, nextTick, computed } from "vue";

const props = defineProps(["room", "isEdit", "isAdd", "isActive"]);
const emit = defineEmits(["del", "edit", "open-edit", "add", "toggle-room"]);

const inValue = ref(props.room.name);
const inputDOM = ref({} as HTMLInputElement);

function addOrEdit() {
  if (props.isEdit) {
    emit("edit", props.room, inValue.value);
  }
  if (props.isAdd) {
    emit("add", inValue);
  }
}

function clickIcon(iconName: string) {
  switch (iconName) {
    case 'Delete':
      emit('del', props.room)
      break
    case 'Edit':
      emit('open-edit', props.room)
      break
    case 'Check':
      addOrEdit()
      break
  }
}

const icons = computed(() => {
  let array = ['Delete', 'Edit']
  if (props.isEdit) {
    array = ['Check']
  }
  return array
})

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


</script>

<template>
  <div
    class="mx-[10px] relative bg-white shadow-sm border-[1px] h-[40px] rounded-lg p-5px flex items-center justify-between my-[5px] hover:border-sky-500">
    <!-- 文本信息 -->
    <div @click="emit('toggle-room', room)"
      class="h-full flex-1 items-center flex border-r-[1px] border-slate-200 cursor-pointer">
      <div class="absolute top-[0px] left-[0px]">
        <el-icon v-if="isActive" size="18">
          <CircleCheck class="text-lime-500" />
        </el-icon>
      </div>
      <p v-show="!isEdit" class="px-[10px] flex-1 basis-0 text-sm text-slate-500">
        {{ room.name }}
      </p>
      <el-input ref="inputDOM" v-show="isEdit || isAdd" v-model="inValue" />
    </div>
    <!-- 按钮组 -->
    <div class="flex">
      <el-icon size="18" v-for="icon in icons" class="mx-[5px]" :class="{'mr-0':icon === 'Delete'}" @click="clickIcon(icon) ">
        <component :is="icon"></component>
      </el-icon>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
}
</style>
