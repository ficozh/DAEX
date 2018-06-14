/**
 * team
 * @class: TeamComponent
 * @version: 0.0.1
 * @date: 2018/06/15
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { ViewAction } from '../app.view.action';


@Component({
  selector: 'app-team',
  templateUrl: './app.team.component.html',
  styleUrls: ['./app.team.component.css']
})

export class TeamComponent {
  constructor(
    private viewAction: ViewAction,
  ) {
  }

}
