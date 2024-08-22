// 单个响应类型
export interface Iresponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 列表响应类型
export interface IListResponse<T>
  extends Iresponse<{
    count: number;
    next: null | string;
    previous: null | string;
    results: T;
  }> {}
