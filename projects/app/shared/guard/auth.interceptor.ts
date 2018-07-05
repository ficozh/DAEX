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
// 路由相关模块
import { Router } from '@angular/router';
import { RouteService } from '@shared/services/route.service';

@Component({template: '<router-outlet></router-outlet>'})
export class AuthComponent implements OnInit {
    isTest: boolean;
    constructor(
    ) {}

    // 存储用户信息
    storeInfo() {
        /* if (userInfoData) {
            // 测试
            if (this.isTest) {
                this.userModel.isLogin = true;
            } else {
                this.userModel.isLogin = userInfoData.isLogin;
            }
        } else {
            // 失败
            this.userModel.isLogin = false;
        } */
    }

    ngOnInit(): void {
    }
}
