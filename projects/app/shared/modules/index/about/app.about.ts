/**
 * about 组件
 * @class: AppAboutComponent
 * @version: 0.0.1
 * @date: 2018/06/13
 * @author: fico
 * @description:
 */
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './app.about.html',
  styleUrls: ['./app.about.css']
})

export class AppAboutComponent implements  OnInit {

  constructor(
  ) {
  }



  // 组件初始化，通常会设置一些初始值
  ngOnInit(): void {
  }

}
