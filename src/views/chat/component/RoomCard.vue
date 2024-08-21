<script setup lang="ts">
import DeleteIcon from '@/assets/svgs/delete.svg'
import EditIcon from '@/assets/svgs/edit.svg'


</script>

<template>
    <div class="w-full bg-slate-100 h-[50px] rounded-lg p-5px flex items-center justify-between">
        <p class="pl-[10px] flex-1 basis-0 text-slate-500">萧家</p>
        <div class="flex">
            <DeleteIcon class="stroke-cyan-300" />
            <EditIcon class="stroke-cyan-300 mx-[8px]" />
        </div>
    </div>
</template>
