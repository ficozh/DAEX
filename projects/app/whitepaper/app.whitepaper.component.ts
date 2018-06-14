/**
 * 场景商店页面
 * @class: IndexComponent
 * @version: 0.1.1
 * @date: 2018/02/11
 * @author: fico
 * @description:
 */
import { Component, OnInit, ChangeDetectorRef, /* ViewChild */ } from '@angular/core';
// 路由相关模块
import { Router, NavigationEnd } from '@angular/router';
// http 模块
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppParam } from '@user';
import { WhitepaperAction } from './app.whitepaper.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.whitepaper.component.html',
  styleUrls: ['./app.whitepaper.component.css']
})

export class WhitepaperComponent implements OnInit {
  // 标题
  public title: string;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private appParam: AppParam,
    private router: Router,
    private whitepaperAction: WhitepaperAction,
    private http: HttpClient
  ) {
  }
  // 更新页面数据(IOS)
  updateData() {
    // 当返回数据报错时，不会执行次方法-会导致IOS页面不渲染
    if (this.appParam.isIOS) {
      // 更新页面数据
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    }
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
  // 组件初始化
  ngOnInit(): void {
    // 设置标题
    this.title = this.appParam.title;

  }

}
