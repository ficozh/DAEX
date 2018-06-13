// 主库
import { Component, OnInit } from '@angular/core';
// 路由相关模块
import { Router, NavigationEnd} from '@angular/router';
// 动画组件
// import { routeAnimation } from './app.animations';
// 页面数据组件
import { AppParam } from '@user';
// Cordova
import { BasicServices } from '@shared/services';
// 获取url参数
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // animations: [routeAnimation]
})
export class AppComponent  implements OnInit {
  // router跳转动画所需参数
  /* routerState = true;
  routerStateCode = 'active'; */
  /* title = 'app';
  list: string[] = [];
  scrollTop: number; */

  constructor(
    private appParam: AppParam,
    private basic: BasicServices,
    // private router: Router,
  ) {
    /* this.scrollTop = 0; */
    /* this.router.events
    .subscribe(event => {
      if (event instanceof NavigationEnd) {
      // 每次路由跳转改变状态
      this.routerState = !this.routerState;
      this.routerStateCode = this.routerState ? 'active' : 'inactive';
      }
    }); */
  }
  /* onScrollChange(el: Element) {
    console.log(11);
    this.scrollTop = el.scrollTop;
  } */
  // 组件初始化
  ngOnInit() {
    /* const item = '小撸家的猫';

    for (let i = 0; i < 100; i++) {
      this.list.push(item);
    } */
    // 测试
    this.appParam.isTestParam =  environment.IS_TEST;
    // 初始化cordova
    this.basic.initialize();
  }
}
