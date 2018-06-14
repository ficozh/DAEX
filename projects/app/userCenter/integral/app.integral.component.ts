/**
 * 积分
 * @class: UserCenterIntegralComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { AppParam } from '@user';
import { UserCenterAction } from '../app.userCenter.action';


@Component({
  selector: 'app-integral',
  templateUrl: './app.integral.component.html',
  styleUrls: ['./app.integral.component.css']
})

export class UserCenterIntegralComponent implements OnInit {
  constructor(
    private appParam: AppParam,
    private userCenterAction: UserCenterAction,
  ) {
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
  // 组件初始化
  ngOnInit(): void {

  }

}
