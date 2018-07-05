/**
 * 请求
 * @class: WhitepaperAction
 * @version: 0.1.6
 * @date: 2018/06/14
 * @author: fico
 * @description:
 * 对外提供 get 和 set 异步方法
 */
import { Injectable } from '@angular/core';
// 路由相关模块
import { UserModel, AppParam } from '@user';
// 服务
import { HttpServices, BasicServices } from '../shared/services';
// 环境配置
import { environment } from 'environments/environment';
// 类型接口
import { HttpOption, HandleOption } from '@int/types';

declare const $$: any;

@Injectable()
export class UserCenterAction {
    constructor(
        private httpServices: HttpServices,
        private basicServices: BasicServices,
        private appParam: AppParam,
        private userModel: UserModel
    ) {
    }


    // 回调操作
    private CallbackHandle(options: HandleOption) {
        if (options.type === 'success') {
            console.log('请求' + name + '成功:' + JSON.stringify(options.result));
            if (this.appParam.isTestParam || options.result.code === 0) {
                // 判断返回数据
                if (options.result.data !== null) {
                    options.callback(options.result.data);
                }
            } else {
                // $$.warn(options.result.retInfo);
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
    // 请求
    private httpSend(options: HttpOption) {
        const that = this;
        this.httpServices.HTTP(options, (option: HandleOption) => {
            that.CallbackHandle({
                'type': option.type,
                'name': option.name,
                'result': option.result,
                'callback': option.callback,
                'error': option.error
            });
        });
    }

    // 获取数据
    get(name: 'emailValid' | 'message' | 'sendingMailCode' | 'validMailCode' | 'refreshCode' | 'validCode', options?: any, callback?: Function, error?: Function ) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        // 判断参数类型
        if (typeof options === 'function') {
            callback = arguments[1];
            error = arguments[2];
            options = undefined;
        }
        switch (name) {
            // 验证用户名
            case 'emailValid':
                paramURL = 'api/user/validname';
                httpBody = {
                    // 用户名
                    'username': [options.username]
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 内容
            case 'message':
                paramURL = 'api/message';
                httpBody = {
                    // 用户名
                    'username': [options.username]
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 请求邮箱验证码
            case 'sendingMailCode':
                paramURL = 'api/sendingMailCode';
                httpBody = {};
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 验证邮箱验证码
            case 'validMailCode':
                paramURL = 'api/validMailCode';
                httpBody = {};
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 请求图片验证码
            case 'refreshCode':
                paramURL = 'api/refreshCode';
                httpBody = {};
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 验证图片验证码
            case 'validCode':
                paramURL = 'api/validCode';
                httpBody = {};
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            default:
                return false;
        }
        this.httpSend({
            'name': name,
            'url': URL,
            'paramUrl': paramURL,
            'httpBody': httpBody,
            'callback': callback || function() {},
            'error': error || function() {}
        });
    }

    // 提交数据
    set(name: string | 'register' | 'login', options: any, callback?: Function, error?: Function) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        switch (name) {
            // 登录
            case 'login':
                paramURL = 'api/user/login';
                httpBody = {
                    // 用户名
                    'email': options.email,
                    // 密码
                    'password': options.password
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 注册
            case 'register':
                paramURL = 'api/user/save';
                httpBody = {
                    // 邮箱验证码
                    'mailCode': options.mailCode,
                    // 图片验证码
                    'code': options.verify,
                    // 密码
                    'password': options.password,
                    // 邀请码
                    'inviteCode': options.inviteCode,
                    // email
                    'email': options.email
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
        }
        this.httpSend({
            'name': name,
            'url': URL,
            'paramUrl': paramURL,
            'httpBody': httpBody,
            'callback': callback || function() {},
            'error': error || function() {}
        });
    }

}
