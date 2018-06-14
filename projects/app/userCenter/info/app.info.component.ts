/**
 * 个人资料
 * @class: UserCenterInfoComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit} from '@angular/core';
import { AppParam } from '@user';
import { UserCenterAction } from '../app.userCenter.action';


@Component({
  selector: 'app-info',
  templateUrl: './app.info.component.html',
  styleUrls: ['./app.info.component.css']
})

export class UserCenterInfoComponent implements OnInit {
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
