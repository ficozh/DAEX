/**
 * 场景请求
 * @class: SceneAction
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
// 环境配置
import { DataOM } from '@mid';
// 服务
import { HttpServices, BasicServices } from '../shared/services';
// 环境配置
import { environment } from 'environments/environment';
// 类型接口
import { HttpOption, HandleOption } from '@int/types';

declare const $$: any;

@Injectable()
export class SceneAction {
    constructor(
        private httpServices: HttpServices,
        private basic: BasicServices,
        private dataOM: DataOM,
        private appParam: AppParam,
        private userModel: UserModel
    ) {
        setTimeout(() => {
            this.Async();
        }, 10);
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
                if (options.result.data !== null || this.appParam.isTestParam || options.isIgnore) {
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
        // 获取缓存数据
        if (this.dataOM.data[name]) {
            return this.CallbackHandle({
                'type': 'success',
                'name': name,
                'result': this.dataOM.data[name],
                'callback': options.callback,
                'error': options.error,
                'isIgnore': false
            });
        }
        this.Preloader(true);
        this.httpServices.HTTP(options, (option: HandleOption) => {
            that.CallbackHandle({
                'type': option.type,
                'name': option.name,
                'result': option.result,
                'callback': option.callback,
                'error': option.error,
                'isIgnore': option.isIgnore
            });
        });
    }

    // 获取数据
    get(name: string | 'sceneRules' | 'sceneType' | 'sceneList' | 'sceneBanner' | 'sceneDetail', options?: any, callback?: Function, error?: Function ) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        const isIgnore = false;
        let isCordovaHTTP = false;
        // 判断参数类型
        if (typeof options === 'function') {
            callback = arguments[1];
            error = arguments[2];
            options = undefined;
        }
        switch (name) {
            // 场景store场景列表接口
            case 'sceneList':
                paramURL = 'omsappapi/scene/scenetype/list/tag';
                httpBody = {
                    // 用户ID
                    'userId': this.userModel.USER.userId,
                    // 数量
                    'count': '10',
                    // 索引
                    'index': options.index
                };
                // 列表类型 1 为id查询，2 为标签查询
                if (this.appParam.listType === '1') {
                    // 场景类型的ID
                    httpBody['id'] = options.id;
                } else {
                    // 标签
                    httpBody['tags'] = options.tags;
                }
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 场景规则
            case 'sceneRules':
                paramURL = 'iftttscene/scene/rule/getById';
                isCordovaHTTP = true;
                httpBody = {
                    // 家庭ID
                    'familyId': this.userModel.familyId,
                    // 规则ID
                    'ruleId': options.ruleId,
                };
                URL = environment.paths.UWS_URL + paramURL;
                break;
            // 场景store首页一级分类接口
            case 'sceneType':
                paramURL = 'omsappapi/scene/scenetype/list';
                httpBody = {
                    // 用户ID
                    'userId': this.userModel.USER.userId
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 场景详情
            case 'sceneDetail':
                paramURL = 'iftttscene/scene/store/findBasicSceneInfo';
                isCordovaHTTP = true;
                httpBody = {
                    // appId
                    // 'appId': that.userModel.APP.appId || 'MB-UZHSH-0000',
                    // 用户ID
                    'appSceneId': options.appSceneId || 'bdc1176208fb48b9b620cc5d0564db13'
                };
                URL = environment.paths.UWS_URL + paramURL;
                break;
            // 场景首页banner图接口
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
            'error': error,
            'isCordovaHTTP': isCordovaHTTP,
            'isIgnore': isIgnore
        });
    }

    // 提交数据
    set(name: string | 'recordDown' | 'sceneDown', options: any, callback?: Function, error?: Function) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        let isIgnore = false;
        let isCordovaHTTP = false;
        switch (name) {
            // 记录下载
            case 'recordDown':
                isIgnore = true;
                paramURL = 'omsappapi/scene/down/record';
                httpBody = {
                    // 用户ID
                    'userId': this.userModel.USER.userId,
                    // 场景ID
                    'storeId': options.storeId,
                    // 场景名称
                    'storeName': options.storeName,
                    // 状态（1：下载；0：删除）
                    'type': options.type,
                    // 备注
                    'remarks': options.remarks,
                    // 下单价格
                    'price': options.price,
                    // 订单编号
                    'orderNo': options.orderNo,
                    // 用户名称
                    'userName': this.userModel.USER.phoneNumber,
                    // 手机号码
                    'phoneNumber': this.userModel.USER.phoneNumber
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 场景下载
            case 'sceneDown':
                paramURL = 'iftttscene/scene/store/download';
                isCordovaHTTP = true;
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
            'error': error,
            'isCordovaHTTP': isCordovaHTTP,
            'isIgnore': isIgnore
        });
    }

    // 执行数据异步
    private Async() {
        this.dataOM.config({
            autoUpdate : true,
            name: ['sceneBanner', 'sceneType'],
            space: (1000 * 60) * 2,
            init: callback => {
                ['sceneBanner', 'sceneType'].forEach( element => {
                    this.get(element, ResultData => {
                        callback(element, ResultData);
                    });
                });
             }
        });
    }
}
