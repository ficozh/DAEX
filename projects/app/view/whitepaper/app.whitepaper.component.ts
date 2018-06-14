/**
 * 场景商店页面
 * @class: IndexComponent
 * @version: 0.1.1
 * @date: 2018/02/11
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
// 路由相关模块
import { Router, NavigationEnd } from '@angular/router';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.whitepaper.component.html',
  styleUrls: ['./app.whitepaper.component.css']
})

export class WhitepaperComponent {
  constructor(
    private router: Router,
    private viewAction: ViewAction,
  ) {
  }

}
