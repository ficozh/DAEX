/**
 * 密码
 * @class: UserCenterPasswordComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { AppParam } from '@user';
import { UserCenterAction } from '../app.userCenter.action';


@Component({
  selector: 'app-password',
  templateUrl: './app.password.component.html',
  styleUrls: ['./app.password.component.css']
})

export class UserCenterPasswordComponent implements OnInit {
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
