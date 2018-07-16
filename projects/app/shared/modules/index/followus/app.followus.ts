/**
 * followus 组件
 * @class: AppFollowUsComponent
 * @version: 0.0.1
 * @date: 2018/06/22
 * @author: fico
 * @description:
 */
import { Component } from '@angular/core';
import { UserModel } from '@user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followus',
  templateUrl: './app.followus.html',
  styleUrls: ['./app.followus.css']
})

export class AppFollowUsComponent {
  email;
  constructor(
    private userModel: UserModel,
    private router: Router,
  ) {
  }
  JIONUS() {
    this.userModel.email = this.email;
    this.router.navigate(['userCenter/register']);
  }
}
