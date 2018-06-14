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
    // 判断是否登录
    isLogin: boolean;
    // 家庭ID
    familyId: string;
    // APP 信息
    APP: any = {
        'appId': 'MB-UZHSH-0000'
    };
    // url参数
    URL_PARAM: any;
    // 用户信息
    USER: any = {};
    // 设置信息
    setInfo(userInfoData: any) {
        // APP信息
        const _APP_ = ['appId', 'appKey', 'accessToken', 'appVersion', 'clientId', 'appName'];
        _APP_.forEach( itme => {
            this.APP[itme] = userInfoData[itme] || '';
        });
        // 用户信息
        const _USER_ = ['sdToken', 'coSessionId', 'phoneNumber', 'isLogin', 'userId', 'userName', 'offUserId', 'timestamp', 'lng', 'lat'];
        _USER_.forEach( itme => {
            this.USER[itme] = userInfoData[itme] || '';
        });
    }
}
