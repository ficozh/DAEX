/**
 * footer 组件
 * @class: AppFooterComponent
 * @version: 0.0.1
 * @date: 2018/05/22
 * @author: fico
 * @description:
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.html',
  styleUrls: ['./app.footer.css']
})

export class AppFooterComponent {
  // title
  @Input() title: string;
  // 父级方法 点击打开图片预览
  @Output() call: EventEmitter<number> = new EventEmitter();
  // 点击调用父级方法
  parentMethod() {
    this.call.emit();
  }

}
