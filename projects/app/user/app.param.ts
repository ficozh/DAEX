/**
 * APP参数
 * @class: AppParam
 * @version: 0.0.7
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      APP 所需的参数类型的定义和初始化
 */
export class AppParam {
    [x: string]: any;
    // 标题
    title: string;
    // 是否是测试
    isTestParam: boolean;
    // 当前系统(IOS)
    isIOS = /iPhone|mac|iPod|iPad/i.test((navigator || window.navigator).userAgent);

    // 当前系统(IOS)针对ios不显示进行特殊处理
    initIOS(callback?: Function) {
        if (this.isIOS) {
            setTimeout(() => {
                callback();
            }, 1);
        }
    }
}
