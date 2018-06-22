/**
 * header 组件
 * @class: AppHeaderComponent
 * @version: 0.0.3
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      APP header 组件的封装
 *      提供 菜单、返回事件
 *      2018/02/28 -- 增加关闭APP方法 exitApp
 */
import { Component, Input } from '@angular/core';
import { RouteService } from '@shared/services/route.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: ['./app.header.css']
})

export class AppHeaderComponent {
  @Input() title: string;
  constructor(
    // private appPlugin: AppPlugin,
    private router: Router,
    private translate: TranslateService,
    private routeService: RouteService,
  ) { }
  // 菜单事件
  onMenu() {
    $$('#Navigation').toggleClass('active animated fadeInRight');
  }
  // 返回事件
  Language(name: string) {
    this.translate.use(name);
  }

}
