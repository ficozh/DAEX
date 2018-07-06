/**
 * about 组件
 * @class: AppAboutComponent
 * @version: 0.0.1
 * @date: 2018/06/13
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './app.about.html',
  styleUrls: ['./app.about.css']
})

export class AppAboutComponent {
  playState: boolean;
  play() {
    this.playState = true;
  }
}
