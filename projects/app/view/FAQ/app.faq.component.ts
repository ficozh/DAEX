/**
 * FAQ
 * @class: FAQComponent
 * @version: 0.0.1
 * @date: 2018/06/15
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-faq',
  templateUrl: './app.faq.component.html',
  styleUrls: ['./app.faq.component.css']
})

export class FAQComponent {
  constructor(
    private viewAction: ViewAction,
  ) {
  }

}
