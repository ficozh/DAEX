/**
 * FAQ
 * @class: BountyComponent
 * @version: 0.0.1
 * @date: 2018/07/09
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-bounty',
  templateUrl: './app.bounty.component.html',
  styleUrls: ['./app.bounty.component.css']
})

export class BountyComponent {
  constructor(
    private viewAction: ViewAction,
  ) {
    $$('html').scrollTop(0, 300);
    $$.initAccordion(true);
  }

}
