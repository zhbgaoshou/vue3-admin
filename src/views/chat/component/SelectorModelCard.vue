<script setup lang="ts">
defineProps(["model"]);
defineEmits(["toggle-model"]);
</script>

<template>
  <div
    @click="$emit('toggle-model', model)"
    class="flex m-[5px] items-center cursor-pointer py-[5px] px-[10px] rounded-[10px] hover:text-green-500"
    :class="{ 'text-sky-500': model.selected }"
  >
    <el-icon size="22">
      <component :is="model.icon"></component>
    </el-icon>
    <div class="ml-[5px]">
      <h4 class="font-bold">{{ model.name }}</h4>
      <span class="text-xs">{{ model.description }}</span>
    </div>
  </div>
</template>
