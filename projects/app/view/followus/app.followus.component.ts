/**
 * followus
 * @class: FollowusComponent
 * @version: 0.0.1
 * @date: 2018/06/15
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-followus',
  templateUrl: './app.followus.component.html',
  styleUrls: ['./app.followus.component.css']
})

export class FollowusComponent {
  constructor(
    private viewAction: ViewAction,
  ) {
  }

}
