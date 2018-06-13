/**
 * 数据接口
 * @class: DataOM
 * @version: 0.0.1
 * @date: 2018/05/31
 * @author: fico
 * @description:
 */
import { once, IsEqual } from '../common/index';

// 配置文件
export interface Config {
    // 自动更新
    autoUpdate?: boolean;
    // 间隔时间
    space?: number;
    // 数据
    name?: any;
    // 初始化
    init(callback: Function): void;
}

export class DataOM {
    // 数据
    data: Object = {};
    // 名称
    name: any;
    private subscribeCallback: Function = function() {};
    constructor(
    ) {}
    subscribe(callback: (name: string, data: any) => void ) {
        this.subscribeCallback = callback;
    }

    // 配置文件
    config(options: Config) {
        const that = this;
        that.name = options.name;
        // 初始化执行方法
        const _Init_ = function() {
            options.init((name, data) => {
                // 赋值
                if ( !IsEqual.prototype.get(that.data[name], data) ) {
                    that.data[name] = data;
                    that.subscribeCallback(name, that.data[name]);
                }
            });
        };
        once(_Init_());
        // 自动同步
        if (options.autoUpdate) {
            setInterval(_Init_, options.space || (10000 * 60 * 1));
        }
    }
}
