import request from "@/utils/request";
import type {roomListRes} from './type'

export function fetchRoomListApi(user:number) {
    return request.get<any,roomListRes>(`/chat/room/user=${user}`)
}