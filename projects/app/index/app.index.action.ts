/**
 * 请求
 * @class: IndexAction
 * @version: 0.1.6
 * @date: 2018/02/09
 * @author: fico
 * @description:
 * 对外提供 get 和 set 异步方法
 * 通过调用签名方法获取签名参数
 * 2018/03/06 增加下载接口
 * 2018/04/04 增加that变量，确保this指向
 * 2018/05/28 增加判断返回数据是否存在
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
export class IndexAction {
    constructor(
        private httpServices: HttpServices,
        private basic: BasicServices,
        private appParam: AppParam,
        private userModel: UserModel
    ) {
    }
    // 加载
    private Preloader(isShow: boolean) {
        if (isShow) {
            // load 显示
            window['IS_LOAD'] = false;
            setTimeout(() => {
                if (!window['IS_LOAD']) {
                    $$('#preloader').show();
                }
            }, 200);
        } else {
            // load 隐藏
            window['IS_LOAD'] = true;
            setTimeout(() => {
                $$('#Transit').addClass('TransitOut').transitionEnd(function() {
                    $$('#Transit').remove();
                });
            }, 1000);
            $$('#preloader').hide();
        }
    }

    // 回调操作
    private CallbackHandle(options: HandleOption) {
        this.Preloader(false);
        if (options.type === 'success') {
            console.log('请求' + name + '成功:' + JSON.stringify(options.result));
            if (this.appParam.isTestParam || options.result.retCode === '00000') {
                // 判断返回数据
                if (options.result.data !== null || this.appParam.isTestParam) {
                    options.callback(options.result);
                }
            } else {
                $$.warn(options.result.retInfo);
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
        this.Preloader(true);
        this.httpServices.HTTP(options, (option: HandleOption) => {
            that.CallbackHandle({
                'type': option.type,
                'name': option.name,
                'result': option.result,
                'callback': option.callback,
                'error': option.error,
            });
        });
    }

    // 获取数据
    get(name: string | 'sceneRules' | 'sceneType' | 'sceneList' | 'sceneBanner' | 'sceneDetail', options?: any, callback?: Function, error?: Function ) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        const isIgnore = false;
        // 判断参数类型
        if (typeof options === 'function') {
            callback = arguments[1];
            error = arguments[2];
            options = undefined;
        }
        switch (name) {
            // 首页banner图接口
            case 'sceneBanner':
                paramURL = 'omsappapi/ad/popup';
                // 广告位置1005：场景轮播广告
                httpBody = {
                    'adLocation': '1005'
                };
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
            'callback': callback,
            'error': error
        });
    }

    // 提交数据
    set(name: string | 'recordDown' | 'sceneDown', options: any, callback?: Function, error?: Function) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        switch (name) {
            // 下载
            case 'sceneDown':
                paramURL = 'iftttscene/scene/store/download';
                httpBody = {
                    // 需要下载的场景
                    'storeSceneIds': [options.storeSceneIds],
                    // 家庭Id
                    'familyId': this.userModel.familyId
                };
                URL = environment.paths.UWS_URL + paramURL;
                break;
        }
        this.httpSend({
            'name': name,
            'url': URL,
            'paramUrl': paramURL,
            'httpBody': httpBody,
            'callback': callback,
            'error': error
        });
    }

}
