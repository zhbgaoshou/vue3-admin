import type { Iresponse } from "../pulicType";

export interface room {
    "id": number,
    "name": string,
    "user": number
}

export interface roomListRes extends Iresponse {
    data: {
        "count": number,
        "next": null | string,
        "previous": null | string,
        "results": room[]
    }
}