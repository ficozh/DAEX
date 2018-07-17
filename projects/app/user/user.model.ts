/**
 * 用户信息参数
 * @class: UserModel
 * @version: 0.0.8
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      用户所需的参数类型的定义和初始化
 */
export class UserModel  {
    [x: string]: any
    // 判断是否登录
    isLogin: boolean;
    email: string;
    newId: any;
    user: any = {
        'tokenId': '',
        'status': false
    };
    anchor: number;
    anchorName: string;
    anchorOffset: any = {
        'home': '0'
    };
}
