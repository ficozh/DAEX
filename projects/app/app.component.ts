// 主库
import { Component, OnInit } from '@angular/core';
// 路由相关模块
import { Router, NavigationEnd} from '@angular/router';
// 页面数据组件
import { AppParam } from '@user';
// Cordova
import { BasicServices } from '@shared/services';
// 获取url参数
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent  implements OnInit {
  constructor(
    private appParam: AppParam,
    private basic: BasicServices,
  ) {
  }
  // 组件初始化
  ngOnInit() {
    // 测试
    this.appParam.isTestParam =  environment.IS_TEST;
    // 初始化
    this.basic.initialize();
  }
}
