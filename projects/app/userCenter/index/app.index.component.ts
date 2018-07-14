/**
 * 积分
 * @class: UserCenterIntegralComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserModel } from '@user';
import { UserCenterAction } from '../app.userCenter.action';


@Component({
  selector: 'app-usercenter-index',
  templateUrl: './app.index.component.html',
  styleUrls: ['./app.index.component.css']
})

export class UserCenterIndexlComponent implements OnInit {
  integral;
  userName: any;
  constructor(
    private userModel: UserModel,
    private userCenterAction: UserCenterAction,
  ) {
  }
  // 组件初始化
  ngOnInit(): void {
    this.userName = this.userModel.user.email ||  window.sessionStorage.email;
    this.userCenterAction.get('coinCount',  (ResultData) => {
      this.integral = ResultData.data.account;
      this.userModel.user.integral = ResultData.data.account;
    });
  }

}
