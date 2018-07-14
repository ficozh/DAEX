/**
 * new
 * @class: NewDetailsComponent
 * @version: 0.0.1
 * @date: 2018/07/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { ViewAction } from '../app.view.action';
import { UserModel } from '@user';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-newdetails',
  templateUrl: './app.newDetails.component.html',
  styleUrls: ['./app.newDetails.component.css']
})

export class NewDetailsComponent implements OnInit {
  newInfo: any;

  constructor(
    private userModel: UserModel,
    private viewAction: ViewAction,
  ) {
  }
  ngOnInit(): void {
    this.viewAction.get('messageInfo', {'code': this.userModel.newId }, (ResultData) => {
      this.newInfo = ResultData.data;
    });
  }
}
