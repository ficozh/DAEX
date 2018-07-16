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
import { AppParam, UserModel } from '@user';
// 服务
import { HttpServices } from '@shared/services';
// 环境配置
import { environment } from '@env/environment';
// 类型接口
import { HttpOption, HandleOption } from '@int/types';

@Injectable()
export class UserCenterAction {
    constructor(
        private httpServices: HttpServices,
        private appParam: AppParam,
        private userModel: UserModel
    ) {
    }


    // 回调操作
    private CallbackHandle(options: HandleOption) {
        if (options.isCallback) {
            if (options.type === 'success') {
                console.log('请求' + options.name + '成功:' + options.result);
                options.result = JSON.parse(options.result);
                if (this.appParam.isTestParam || options.result.code === 0) {
                    // 判断返回数据
                    options.callback(options.result);
                } else {
                    options.error();
                }
            } else {
                console.log('请求' + options.name + '失败:' + JSON.stringify(options.result));
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
                'error': option.error
            });
        });
    }

    // 获取数据
    get(name: 'emailValid' | 'sendingMailCode' | 'validMailCode' | 'refreshCode' | 'validCode' | 'record' | 'coinCount' | 'mission' | 'missionInfo' | 'exchangeRecordList',
    options?: any, callback?: Function, error?: Function ) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        let isCallback = true;
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
                    'email': options.email
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 请求邮箱验证码
            case 'sendingMailCode':
                paramURL = 'api/sendingMailCode';
                isCallback = false;
                httpBody = {
                    'tag': options.tag,
                    'email': options.email
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 验证邮箱验证码
            case 'validMailCode':
                paramURL = 'api/validMailCode';
                httpBody = {
                    'tag': options.tag,
                    'mailCode': options.emailCode
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 请求图片验证码
            case 'refreshCode':
                paramURL = 'api/refreshCode';
                httpBody = {
                    'tag': options.tag
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 验证图片验证码
            case 'validCode':
                paramURL = 'api/validCode';
                httpBody = {
                    'tag': options.tag,
                    'picCode': options.verify
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 获取账户积分余额
            case 'coinCount':
                paramURL = 'api/dax/account/coinCount';
                httpBody = {
                    'tokenId': this.userModel.user.tokenId
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 任务列表
            case 'mission':
                paramURL = 'api/mission/list';
                httpBody = {
                    'tokenId': this.userModel.user.tokenId
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 任务详情
            case 'missionInfo':
                paramURL = 'api/mission/info/' + options.id;
                httpBody = {
                    'tokenId': this.userModel.user.tokenId
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 已做任务记录
            case 'record':
                paramURL = 'api/mission/record/list';
                httpBody = {
                    // 分页大小
                    'limit': options.limit,
                    // 页数
                    'page': options.page,
                    // type为1，传此字段任务类型0：social bounties,1：creative bounties
                    'subType': options.subType,
                    // 主分类0:新手任务1：赏金任务
                    'type': options.type,
                    // 排序方式，desc,asc两个选项
                    'order': 'desc',
                    // 其他条件，没有可不填
                    'sidx': options.sidx,
                    'tokenId': this.userModel.user.tokenId
                };
                if (httpBody['type'] === '0') {
                    delete httpBody['subType'];
                }
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // dax兑换记录
            case 'exchangeRecordList':
                paramURL = 'api/dax/exchangeRecordList';
                httpBody = {
                    // 分页大小
                    'limit': options.limit,
                    // 页数
                    'page': options.page,
                    // 排序方式，desc,asc两个选项
                    'order': 'desc',
                    // 其他条件，没有可不填
                    'sidx': options.sidx,
                    'tokenId': this.userModel.user.tokenId
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
            'isCallback': isCallback,
            'callback': callback || function() {},
            'error': error || function() {}
        });
    }

    // 提交数据
    set(name: 'register' | 'login' | 'password' | 'saveCoinRecord' | 'saveExchangeRecord' | 'updateinfo' | 'upload' | 'recordSave', options: any, callback?: Function, error?: Function) {
        let httpBody = {};
        let URL = '';
        let paramURL = '';
        const isCallback = true;
        switch (name) {
            // 登录
            case 'login':
                paramURL = 'api/user/login';
                httpBody = {
                    // 邮箱
                    'email': options.email,
                    // 邮箱验证码
                    'emailCode': options.emailCode,
                    // 图片验证码
                    'code': options.code,
                    // 密码
                    'password': options.password
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 更改密码
            case 'password':
                paramURL = 'api/user/resetPassword';
                httpBody = {
                    // 邮箱
                    'email': options.email,
                    'mailCode': options.emailCode,
                    'tag': options.tag,
                    // 密码
                    'password': options.password
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 保存积分消费记录
            case 'saveCoinRecord':
                paramURL = 'api/dax/account/saveCoinRecord';
                httpBody = {
                    // 用户id
                    'tokenId': this.userModel.user.tokenId,
                    // 消费方式
                    'usage': options.usage,
                    // 收入 为正，则为积分收入，为负，则为积分支出
                    'costCoin': options.costCoin
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 保存积分收支记录
            case 'saveExchangeRecord':
                paramURL = 'api/dax/saveExchangeRecord';
                httpBody = {
                    // 用户id
                    'tokenId': this.userModel.user.tokenId,
                    // 提现地址
                    'depositAddress': options.depositAddress,
                    // 提现规则
                    'rule': options.rule,
                    // 提现状态0：提现成功，1：申请中
                    'status': options.status,
                    // 消耗积分数
                    'costCoin': options.costCoin,
                    // 提现数量
                    'depositCount': options.depositCount
                };
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 上传文件接口
            case 'upload':
                paramURL = 'api/oss/upload';
                httpBody = {
                    // 提现地址
                    'file': options.file
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
            // 完善个人资料
            case 'updateinfo':
                paramURL = 'api/user/update';
                if (options.userType === 1) {
                    // 个人注册
                    httpBody = {
                        // 姓
                        'firstName': options.firstName,
                        // 名
                        'lastName': options.lastName,
                        // 国籍
                        'nation': options.nation,
                        // 证件类型
                        'cardType': options.cardType,
                        // 证件号码
                        'cardCode': options.cardCode,
                        // 证件有效期
                        'validDate': options.validDate,
                        // 居住地址
                        'address': options.address,
                        // 钱包地址
                        'purseAddress': options.purseAddress,
                        // 身份证正面
                        'licenseFront': options.licenseFront,
                        // 身份证反面
                        'licenseBack': options.licenseBack,
                        // 手持身份证正面
                        'handFront': options.handFront,
                        // 手持身份证反面
                        'handBack': options.handBack
                    };
                } else {
                    // 企业注册
                    httpBody = {
                        // 企业或机构名称
                        'name': options.name,
                        // 注册编码
                        'registerCode': options.registerCode,
                        // 发证机构
                        'certifyAuthority': options.certifyAuthority,
                        // 注册日期
                        'registerDate': options.registerDate,
                        // 续存有效期
                        'validDate': options.validDate,
                        // 注册地址
                        'companyAddress': options.companyAddress,
                        // 法定代表人
                        'representative': options.representative,
                        // 法定代表人联系方式
                        'contact': options.contact,
                        // 公司营业执照图片
                        'licenseUrl': options.licenseUrl,
                        // 钱包地址
                        'purseAddress': options.purseAddress
                    };
                }
                httpBody['tokenId'] = this.userModel.user.tokenId;
                httpBody['userType'] = options.userType;
                URL = environment.paths.SERVER_URL + paramURL;
                break;
            // 接受任务
            case 'recordSave':
                paramURL = 'api/mission/record/save';
                httpBody = {
                    // 任务的ID
                    'missionId': options.missionId,
                    'tokenId': this.userModel.user.tokenId
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
            'callback': callback || function() {},
            'error': error || function() {}
        });
    }

}
