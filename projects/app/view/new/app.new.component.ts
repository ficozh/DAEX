/**
 * new
 * @class: NewComponent
 * @version: 0.0.1
 * @date: 2018/07/12
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { ViewAction } from '../app.view.action';
import { UserModel } from '@user';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-new',
  templateUrl: './app.new.component.html',
  styleUrls: ['./app.new.component.css']
})

export class NewComponent implements OnInit {
  newInfo: any;

  constructor(
    private userModel: UserModel,
    private viewAction: ViewAction,
  ) {
    $$('html').scrollTop(0, 300);
  }
  ngOnInit(): void {
    this.viewAction.get('messageInfo', {'code': this.userModel.newId }, (ResultData) => {
      this.newInfo = ResultData.data;
    });
  }
}
