/**
 * banner 组件
 * @class: AppBannerComponent
 * @version: 0.0.1
 * @date: 2018/06/13
 * @author: fico
 * @description:
 */
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './app.banner.html',
  styleUrls: ['./app.banner.css']
})

export class AppBannerComponent implements  OnInit {

  constructor(
  ) {
  }



  // 组件初始化，通常会设置一些初始值
  ngOnInit(): void {
  }

}
