export interface userParams {
  username: string;
  password: string;
}

interface Iresponse {
  code: number;
  msg: string;
}

interface loginRes extends Iresponse {
  data: { access: string; refresh: string };
}

interface userInfo {
  username: string;
  email: string;
  date_joined: string;
  profile: {
    image: string;
  };
}

interface userInfoRes extends Iresponse {
  data: userInfo;
}
