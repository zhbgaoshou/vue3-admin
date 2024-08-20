<script setup lang="ts">
import { Files } from "@element-plus/icons-vue";
import { ref } from "vue";

defineEmits(["send", "file"]);
defineProps(["role", "content"]);
const input = ref("");
</script>

<template>
  <el-input
    v-model="input"
    placeholder="输入内容"
    size="large"
    show-word-limit
    clearable
    class="h-full relative"
  >
    <template #prepend>
      <input
        type="file"
        class="absolute w-full h-full z-10 opacity-0"
        @change="
          (e) => $emit('file', (e.target as HTMLInputElement )?.files)"
      />
      <el-button icon="Paperclip" />
    </template>
    <template #append>
      <el-button icon="Position" @click="$emit('send', input)" />
    </template>
  </el-input>
</template>
