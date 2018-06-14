/**
 * community
 * @class: CommunityComponent
 * @version: 0.0.1
 * @date: 2018/06/15
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-community',
  templateUrl: './app.community.component.html',
  styleUrls: ['./app.community.component.css']
})

export class CommunityComponent {
  constructor(
    private viewAction: ViewAction
  ) {
  }

}
