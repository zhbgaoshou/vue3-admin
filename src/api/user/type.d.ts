import type { Iresponse } from "../publicType";

export interface userParams {
  username: string;
  password: string;
}

export interface auth {
  access: string;
  refresh: string;
}

export interface loginRes extends Iresponse<auth> {}

export interface userInfo {
  id: number;
  username: string;
  email: string;
  date_joined: string;
  profile: {
    image: string;
  };
}

interface userInfoRes extends Iresponse<userInfo> {}
