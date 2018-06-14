/**
 * index
 * @class: IndexComponent
 * @version: 0.1.1
 * @date: 2018/02/11
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.index.component.html',
  styleUrls: ['./app.index.component.css']
})

export class IndexComponent {
  constructor(
    private viewAction: ViewAction,
  ) {
  }

}
