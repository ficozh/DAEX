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
import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from '@shared/services/route.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from '@user';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: ['./app.header.css']
})

export class AppHeaderComponent implements OnInit {
  @Input() info: number;
  @Input() title: string;
  showUser: boolean;
  isLanguage = false;
  constructor(
    private router: Router,
    private userModel: UserModel,
    private translate: TranslateService,
    private routeService: RouteService,
  ) { }

  ngOnInit(): void {
    this.showUser = this.userModel.isLogin || (window.sessionStorage.isLogin === 'true');
  }
  setAnchor(num, name) {
    this.info = num;
    this.userModel.anchor = num;
    this.userModel.anchorName = name;
    let AnchorOffset = 0;
    const _Offset_ = $$('#' + name).offset();
    if (_Offset_) {
      AnchorOffset = _Offset_.top - 45;
      if (name === 'home') {
        AnchorOffset = 0;
      }
      console.log(AnchorOffset);
      $$('html').scrollTop(AnchorOffset, 300);
      }
  }
  // 菜单事件
  onMenu() {
    $$('#Navigation').toggleClass('active animated fadeInRight').animationEnd(function() {
      $$('body').once('click', function() {
        $$('#Navigation').toggleClass('active animated fadeInRight');
      });
    });
  }
  // 返回事件
  Language(name: string) {
    this.isLanguage = false;
    window.sessionStorage.language = name;
    this.translate.use(name);
  }
  // 打开语言选项
  OpenLanguage() {
    this.isLanguage = true;
  }
  // 退出
  signOut() {
    this.showUser = false;
    window.sessionStorage.isLogin = '';
    window.sessionStorage.tokenId = '';
    this.userModel.isLogin = false;
    window.location.reload(true);
  }

}
