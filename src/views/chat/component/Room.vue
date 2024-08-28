<script setup lang="ts">
import RoomCard from "./RoomCard.vue";
import useRoomStore from "@/store/modules/room";
import useUserStore from "@/store/modules/user";
import { deleteRoomApi, editRoomApi, addRoomApi } from "@/api/room";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import type { room } from "@/api/room/type";
import { ref, reactive } from "vue";
import empty from "@/assets/images/room_null.png";

const roomStore = useRoomStore();
const { user } = useUserStore();

let isAdd = ref(false);
const addRoomData = reactive({
  name: "",
  user: 0,
} as room);

async function getRoomList() {
  try {
    await roomStore.fetchRoomList(user);
    if (roomStore.todayObject.data.length === 0) {
      // 如果会话列表为空，则创建一个新会话并重新获取列表
      await roomStore.fetchAddRoom({ name: "新会话", user });
      await roomStore.fetchRoomList(user);
    }
  } catch (error) {
    console.error("获取会话列表时出错:", error); // 更加详细的错误日志
  }
}

// 删除会话的处理函数
async function delRoom(room: room, objcet: any) {

  if (objcet.date === '今天' && objcet.data.length <= 1) {
    return ElNotification({
      message: "今天最少留一个会话",
      type: "error",
    });
  }

  try {
    // 确认删除对话框
    await ElMessageBox.confirm(`确定删除 ${room.name} ?`, "删除会话", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      roundButton: true,
      showClose: false,
      customClass: "!rounded-[20px]",
    });
    const res = await deleteRoomApi(room.id as number);
    if (res.status === 204) {
      ElMessage.success("删除成功");
      await getRoomList(); // 删除成功后重新获取会话列表
    } else {
      ElMessage.error("删除失败，稍后重试");
    }
  } catch (error) { }
}

function openEdit(room: room) {
  room.checked = true;
}
// 编辑会话的处理函数(点击勾选按钮处理)
async function editRoom(room: room, newName: string) {
  if (!newName || room.name === newName) {
    room.checked = false;
    return;
  }

  try {
    const res = await editRoomApi(room.id as number, { name: newName });
    if (res.code === 200) {
      ElMessage.success("修改成功");
      await getRoomList(); // 成功修改后重新获取会话列表
    } else {
      ElMessage.error("修改失败，稍后重试");
    }
  } catch (error) {
    ElMessage.error("修改失败");
    console.error("修改会话时出错:", error); // 更加详细的错误日志
  } finally {
    // isEdit.value = false; // 无论成功与否，都退出编辑模式
    room.checked = false;
  }
}

async function addRoom(inValue: any) {
  if (inValue.value === "") {
    isAdd.value = !isAdd.value;
    inValue.value = "";
    return;
  }
  try {
    const res = await addRoomApi({ user, name: inValue.value });
    if (res.code < 400) {
      roomStore.activeRoom = res.data
      
      await getRoomList();
      ElMessage.success("添加成功");
    }
  } catch (error) {
    ElMessage.error("添加失败");
  } finally {
    inValue.value = "";
    isAdd.value = false;
  }
}

function handleToggleRoom(room:any){
  roomStore.activeRoom = room
}

getRoomList();
</script>

<template>
  <div class="w-[180px] bg-white border-[1px] border-r-0 border-t-0 h-full flex-col">
    <!-- 顶部 -->
    <div class="flex px-[10px] justify-between items-center">
      <h2 class="py-[5px] text-center text-slate-500 font-semibold">
        会话列表
      </h2>
      <el-icon size="22" class="antialiased" @click="isAdd = true">
        <component is="CirclePlus"></component>
      </el-icon>
    </div>

    <!-- 会话列表 -->
    <div class="flex-1 overflow-auto">
      <!-- 新增会话 -->
      <RoomCard v-show="isAdd" :room="addRoomData" :isEdit="true" :isAdd="isAdd" @add="addRoom" />
      <!-- 列表 -->
      <el-collapse :model-value="['today','yesterday','three_days_ago','seven_days_ago','one_month_ago']">
        <el-collapse-item :name="key" v-for="(rooms, key) in roomStore.roomList" :key="key">
          <template #title>
            <span class="mx-[10px] font-semibold">{{ rooms.date }}</span>
          </template>

          <el-empty v-if="!rooms.data.length" description="暂无新对话" :image-size="36" :image="empty" />

          <RoomCard v-for="item in rooms.data" :key="item.id" :room="item" :isEdit="item.checked" :objcet="rooms"
            @del="delRoom" @edit="editRoom" @open-edit="openEdit" @toggle-room="handleToggleRoom"/>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-collapse-item__content) {
  padding: 0;
}

:deep(.el-empty) {
  --el-empty-padding: 0;
  --el-empty-description-margin-top: 0;
}
</style>
