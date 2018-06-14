/**
 * 鉴权认证
 * @class: AuthComponent
 * @version: 0.1.0
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      根据返回结果中的 isLogin 判断用户是否登陆
 */

import { Component, OnInit } from '@angular/core';
// 用户信息
import { UserModel, AppParam } from '@user';
// Cordova
import { BasicServices } from '../services/basic.services';
// 路由相关模块
import { Router } from '@angular/router';
import { RouteService } from '@shared/services/route.service';

@Component({template: '<router-outlet></router-outlet>'})
export class AuthComponent implements OnInit {
    isTest: boolean;
    exclude = ['details'];
    constructor(
        private appParam: AppParam,
        private router: Router,
        private userModel: UserModel,
        private basic: BasicServices,
        private routeService: RouteService
    ) {}
    private _getUserInfo(callback?: Function, error?: Function) {
        // 测试
        if (this.isTest) {
            callback();
            return;
        }
        // 获取用户信息
        this.basic.getUserInfo(callback, error);
    }
    // 存储用户信息
    storeInfo(userInfoData?: any) {
        if (userInfoData) {
            // 测试
            if (this.isTest) {
                this.userModel.isLogin = true;
            } else {
                this.userModel.isLogin = userInfoData.isLogin;
            }
        } else {
            // 失败
            this.userModel.isLogin = false;
        }
        // history.back(); history.go(-1);
        if (this.routeService.routeMode) {
            this.router.navigate(['/index/home']);
        } else {
            let Url = this.routeService.get(-2);
            if (Url.indexOf('?') > -1) {
                const Mark = Url.indexOf('?');
                Url = Url.substring(0, Mark);
            }
            if (Url.indexOf(this.exclude[0]) === -1) {
                Url = '/index/home';
            }
            this.router.navigate([Url]);
        }
    }

    ngOnInit(): void {
        this.isTest = this.appParam.isTestParam;
        // cordova准备就绪
        this.basic.isReady(this.isTest , () => {
            this._getUserInfo( userInfoData => {
                console.log('用户信息：' + JSON.stringify(userInfoData));
                userInfoData = userInfoData || {
                    'isLogin': true,
                    'appId': 'MB-UZHSH-0000',
                    'accessToken': 'TGT2GQCE2O57LZKA25FSKUUC87ZGI0',
                    'lng': 0,
                    'clientId': 'F76592468F24B4DE6E1CAD1D6F03563E',
                    'appName': 'upluszhsh',
                    'coSessionId': '116201611021026211226',
                    'phoneNumber': '18049000492',
                    'offUserId': '18000347',
                    'appVersion': '3.5.0',
                    'userId': '4291271',
                    'sdToken': 'd78f29bc-27ae-437e-a303-d06e219fdc5c',
                    'success': true,
                    'lat': 0,
                    'appKey': 'f50c76fbc8271d361e1f6b5973f54585'
                };

                this.userModel.setInfo(userInfoData);
                this.storeInfo(userInfoData);
            }, () => {
                this.storeInfo();
            });
        });
    }
}
