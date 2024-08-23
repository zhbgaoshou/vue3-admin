import type { IListResponse, Iresponse } from "../publicType";

export interface room {
  id?: number;
  name: string;
  user: number;
  active?: boolean;
  checked?: boolean;
}

export interface editRoomParams {
  name: string;
}

export interface roomListRes extends IListResponse<room[]> {}
export interface addRoomRes extends Iresponse<room> {}
