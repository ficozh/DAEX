// 定义返回数据接口
export interface ResponseResult {
    data: any;
    retCode: string;
    retInfo: string;
}
// http选项
export interface HttpOption {
    name: string;
    url: string;
    isCallback:boolean;
    paramUrl: string;
    httpBody: any;
    callback: Function;
    error: Function;
}

// 定义返回数据接口
export interface HandleOption {
    type: 'success' | 'error';
    name: string;
    isCallback:boolean;
    result: any;
    callback: Function;
    error: Function;
}
