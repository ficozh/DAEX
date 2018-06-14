/**
 * information
 * @class: InformationComponent
 * @version: 0.1.1
 * @date: 2018/02/11
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.information.component.html',
  styleUrls: ['./app.information.component.css']
})

export class InformationComponent {
  constructor(
    private viewAction: ViewAction,
  ) {
  }

}
