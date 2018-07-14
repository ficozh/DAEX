/**
 * FAQ
 * @class: FAQComponent
 * @version: 0.0.1
 * @date: 2018/06/15
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { ViewAction } from '../app.view.action';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-faq',
  templateUrl: './app.faq.component.html',
  styleUrls: ['./app.faq.component.css']
})

export class FAQComponent implements OnInit {
  faqList: any;
  constructor(
    private viewAction: ViewAction,
  ) {
    $$('html').scrollTop(0, 300);
    $$.initAccordion(true);
  }
  ngOnInit(): void {
    // 任务列表
    this.viewAction.get('faq', (ResultData) => {
      this.faqList = ResultData.data.page;
    });
  }

  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
}
