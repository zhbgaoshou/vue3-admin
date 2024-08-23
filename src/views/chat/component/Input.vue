<script setup lang="ts">
import { ref } from "vue";
import FilesIcon from '@/assets/svgs/files.svg'
import SendIcon from '@/assets/svgs/send.svg'
import { defaultModel } from '@/config/chat'

const emit = defineEmits(["send", "file",'goto-bottom']);
defineProps(["role", "content",'isGotoBottom']);
const input = ref("");

const icons = [{
  name: 'FilesIcon', icon: FilesIcon
}, { name: 'SendIcon', icon: SendIcon }]

function clickIcon(iconName: string) {
  switch (iconName) {
    case 'SendIcon':
      emit('send',input)
      break
  }

}

function changeFile(e:Event){
  const el = e.target as HTMLInputElement
  emit('file',el.files)
}
</script>

<template>
  <div class="flex flex-col bg-stone-100 rounded-md">
    <div class="flex justify-between  h-full m-[10px] relative">
      <!-- 警告 -->
      <div class="flex items-center">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <p class="mx-[5px] text-slate-400 font-bold text-sm">当前模型:{{ defaultModel }}</p>
      </div>
      <!-- 回到底部 -->
      <div v-show="isGotoBottom" @click="emit('goto-bottom')" class="absolute top-[-100px] right-0 rounded-full bg-white shadow-md p-[9px] cursor-pointer">
        <el-icon :size="28" >
          <Download />
        </el-icon>
       
      </div>
      <!-- 图标 -->
      <div class="flex items-center relative">
        <component :is="item.icon" v-for="item in icons" class="mx-[5px] cursor-pointer" @click="clickIcon(item.name)"></component>
        <input class="w-[30px] absolute opacity-0" type="file" @change="changeFile">
      </div>
    </div>

    <el-input v-model="input" type="textarea" placeholder="请输入内容" :input-style="{  'box-shadow': 'none','border-radius':'0px' }"
      :autosize="{ minRows: 2, maxRows: 14 }" resize="none" />
  </div>
</template>

<style>
.a {

}
</style>