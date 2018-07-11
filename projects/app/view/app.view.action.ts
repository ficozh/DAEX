/**
 * 场景请求
 * @class: ViewAction
 * @version: 0.0.1
 * @date: 2018/06/15
 * @author: fico
 * @description:
 * 对外提供 get 和 set 异步方法
 */
import { Injectable } from '@angular/core';
// 路由相关模块
import { UserModel, AppParam } from '@user';
// 服务
import { HttpServices, BasicServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 类型接口
import { HttpOption, HandleOption } from '@int/types';


@Injectable()
export class ViewAction {
    constructor(
        private httpServices: HttpServices,
        private appParam: AppParam
    ) {
    }

    // 回调操作
    private CallbackHandle(options: HandleOption) {
        if (options.isCallback) {
            if (options.type === 'success') {
                console.log('请求' + name + '成功:' + JSON.stringify(options.result));
                if (this.appParam.isTestParam || options.result.code === 0) {
                    // 判断返回数据
                    options.callback(options.result);
                } else {
                    options.error();
                }
            } else {
                console.log('请求' + name + '失败:' + JSON.stringify(options.result));
                if (this.appParam.isTestParam) {
                    options.callback(options.result);
                }
                options.error();
            }
        }
    }

    // 请求
    private httpSend(options: HttpOption) {
        const that = this;
        this.httpServices.HTTP(options, (option: HandleOption) => {
            that.CallbackHandle({
                'type': option.type,
                'name': option.name,
                'isCallback': option.isCallback,
                'result': option.result,
                'callback': option.callback,
                'error': option.error,
            });
        });
    }

    // 获取数据
    get(name: 'message' | 'messageInfo' | 'paper', options?: any, callback?: Function, error?: Function ) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        const isCallback = true;
        // 判断参数类型
        if (typeof options === 'function') {
            callback = arguments[1];
            error = arguments[2];
            options = undefined;
        }
        switch (name) {
            // 内容
            case 'message':
                paramURL = 'api/message/list';
                httpBody = {
                    // 用户名
                    'limit': '10',
                    'order': '',
                    'sidx': '',
                    'page': options.page
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 内容
            case 'messageInfo':
                paramURL = 'api/message/info' + options.code;
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 白皮书
            case 'paper':
                paramURL = 'api/message/info' + options.code;
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            default:
                return false;
        }
        this.httpSend({
            'name': name,
            'url': URL,
            'isCallback': isCallback,
            'paramUrl': paramURL,
            'httpBody': httpBody,
            'callback': callback,
            'error': error
        });
    }

    // 提交数据
    set(name: 'Down', options: any, callback?: Function, error?: Function) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        const isCallback = true;
        switch (name) {
            // 下载
            case 'Down':
                paramURL = 'iftttscene/scene/store/download';
                httpBody = {
                    // 需要下载
                    'storeSceneIds': [options.storeSceneIds],
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
        }
        this.httpSend({
            'name': name,
            'url': URL,
            'isCallback': isCallback,
            'paramUrl': paramURL,
            'httpBody': httpBody,
            'callback': callback,
            'error': error,
        });
    }
}
